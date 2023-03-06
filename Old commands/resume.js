const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Hervat het huidige nummer.',
    aliases: ["hervat"],
    callback: ({message, args}) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Ik heb de muziek voor je hervat!")
      .setColor("#4fc5f7")
      .setAuthor("Muziek is hervat!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
  },
};
