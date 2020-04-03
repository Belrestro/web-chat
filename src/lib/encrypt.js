const crypto = require('crypto');

// todo: application secret from env
const secret = 'c5b9005f8e99fda9e0dec939cbb564b2';
const salt = secret.toString('hex');
const algorithm = 'aes-256-cbc';
const key = Buffer.from(secret);
const iv = Buffer.alloc(16).fill(secret);

const encrypt = (text) =>  {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(Buffer.from(text, 'utf-8'));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
}

const decrypt = (text) => {
  const encryptedText = Buffer.from(text, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

  return decrypted.toString('utf-8');
}

const createHash = (string) => {
  return crypto.pbkdf2Sync(string, salt, 1000, 64, `sha512`).toString(`hex`); 
}

module.exports = {
  encrypt,
  decrypt,
  createHash,
};
