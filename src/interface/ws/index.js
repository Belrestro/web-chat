const { clients } = require('../../clients/ws');

const NOTIFICATION_TYPES = {
  MESSAGE_CREATED: 'MESSAGE_CREATED',
  CHAT_CREATED: 'CHAT_CREATED',
  USER_CREATED: 'USER_CREATED',
};

const sendNotification = async (userId, type, data) => {
  if (!clients.has(userId)) return false;
  const socket = clients.get(userId);

  try {
    await new Promise((res, rej) => {
      socket.send(JSON.stringify({ type, data }), (err) => {
        if (err) rej(err);
        else res()
      });
    });
  } catch (err) {
    console.log(err)
  }
};

const sendNotificationToMany = async (userIds, type, data) => {
  try {
    if (!userIds || userIds.length === 0 ) {
      userIds = clients.keys();
    }
    await Promise.all(userIds.map(id => {
      return sendNotification(id, type, data);
    }))
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  sendNotification,
  sendNotificationToMany,
  NOTIFICATION_TYPES,
};
