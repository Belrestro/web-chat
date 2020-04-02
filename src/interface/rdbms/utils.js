const fs = require('fs')
const path = require('path')
const MigrationsTable = require('./tables/generic/migrations')

const migrationsSchema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT UNIQUE',
  created_at: "DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))", 
}

const applyMigrations = (client) => {
  const migrationsDir = path.resolve(__dirname, 'migrations')
  client.exec(`CREATE TABLE IF NOT EXISTS migrations (
    id ${migrationsSchema.id},
    name ${migrationsSchema.name},
    created_at ${migrationsSchema.created_at}
  )`)

  const migrations = fs.readdirSync(migrationsDir).sort()
  const migrationByName = migrations.reduce((acc, migration) => {
    acc.set(migration, false)
    return acc
  }, new Map())
  const pastMigrations = MigrationsTable.selectAll()

  for (const pastMigration of pastMigrations) {
    const { name } = pastMigration
    if (!migrationByName.has(name)) throw new Error(`Migration directory is corrupted, missing migration ${name}`)
    migrationByName.set(name, true)
  }

  // apply new migrations
  for (const migration of migrations) {
    if (!migrationByName.get(migration)) {
      try {
        console.log(`Applying new migration, ${migration}`)
        const { up } = require(path.resolve(migrationsDir, migration))
        up(client)
      } catch (err) {
        console.error(`Failed to apply new migration ${migration}`)
        throw err
      }
      MigrationsTable.insert({ name: migration })
      console.log(`Migration ${migration} applied successfully`)
    }
  }
}

module.exports = {
  applyMigrations,
}