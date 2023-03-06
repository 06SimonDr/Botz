const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
    category: 'muziek',
	  description: 'Toont de muziek die momenteel wordt afgespeeld.',
    callback: ({message, args}) => {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Nu aan het spelen", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("#4fc5f7")
      .addField("Naam", song.title, true)
      .addField("Tijd", song.duration, true)
      .addField("Aangevraagd bij", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
