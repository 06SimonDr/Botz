const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Skip een nummer.',
    aliases: ["s"],
    callback: async ({message, args}) => {

    const channel = message.member.voice.channel
    if (!channel)return sendError("Het spijt me, maar je moet een spraakkanaal hebben om muziek af te spelen!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Er wordt niets afgespeeld dat ik voor je zou kunnen overslaan.", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Ik heb de muziek voor je hervat!")
      .setColor("#4fc5f7")
      .setTitle("Muziek is hervat!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: De speler is gestopt en de wachtrij is gewist.: ${error}`, message.channel);
      }
    message.react("✅")
  },
};
