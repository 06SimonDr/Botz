const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Pauzeer een nummer.',
    aliases: ["pause", "pauze"],
    callback: ({message, args}) => {
      
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: De speler is gestopt en de wachtrij is gewist.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Ik pauzeerde de muziek voor jou!")
      .setColor("#4fc5f7")
      .setTitle("Muziek is onderbroken!")
      return message.channel.send(xd);
    }
    return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
  },
};
