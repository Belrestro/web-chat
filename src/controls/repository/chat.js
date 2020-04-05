const { ChatsTable, MessagesTable, UsersTable } = require('../../interface/rdbms/tables');
const { ChatModel, MessageModel } = require('../../models');
const { ValidityError } = require('../../lib/errors');

class ChatRepository {
  static async create(ownerId, chat) {
    const { participantIds } = chat;
    let { name } = chat; 
    if (!participantIds || participantIds.length < 2) {
      throw new ValidityError('Chat should have at least 2 participants');
    }
    const chatId = ChatsTable.insert({ ...chat.serialize(false), name, ownerId });
    const chatRecord = ChatsTable.selectById(chatId);

    return ChatModel.from(chatRecord);
  }

  static async getById(id) {
    const chat = ChatsTable.selectById(id);

    return chat ? ChatModel.from(chat) : null;
  }

  static async deleteById(userId, chatId) {
    const chatRecord = ChatsTable.selectById(chatId);
    const chat = ChatModel.from(chatRecord);

    if (chat.ownerId === userId) {
      ChatsTable.deleteById(chatId);
      MessagesTable.deleteByChatId(chatId);
    } else {
      chat.participantIds = chat.participantIds.filter(id => id !== userId);
      ChatsTable.updateById(chatId, chat.serialize(false));
    }
  }

  static async findByUserId(userId) {
    const chats = ChatsTable.selectByUserId(userId);

    return chats.map(ChatModel.from);
  }

  static async update(id, chat) {
    return ChatsTable.updateById(id, chat.serialize(false));
  } 

  static async createMessage(senderId, chatId, message) {
    const messageId = MessagesTable.insert({ ...message.serialize(), senderId, chatId });
    const messageRecord = MessagesTable.selectById(messageId);

    return MessageModel.from(messageRecord);
  }

  static async getChatMessages(chatId) {
    const messages = MessagesTable.selectByChatId(chatId);

    return messages.map(MessageModel.from);
  }
}

module.exports = ChatRepository;
