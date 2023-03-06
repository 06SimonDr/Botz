const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Maakt de wachtrij leeg.',
    callback: async ({message, args}) => {

    const channel = message.member.voice.channel
    if (!channel)return sendError("Het spijt me, maar je moet een spraakkanaal hebben om muziek af te spelen!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Er speelt niets dat ik voor je zou kunnen stoppen.", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: De speler is gestopt en de wachtrij is gewist.: ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};