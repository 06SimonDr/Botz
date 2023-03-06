const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Pas het volume van de bot aan.',
    callback: async ({message, args}) => {

    const channel = message.member.voice.channel;
    if (!channel)return sendError("Het spijt me, maar je moet in een spraakkanaal zijn om muziek af te spelen!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
    if (!serverQueue.connection) return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
    if (!args[0])return message.channel.send(`Het huidige volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('U kunt het volume niet hoger dan 150. of lager dan 0 instellen',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Ik heb het volume op gezet: **${args[0]/1}/100**`)
    .setAuthor("Servervolumebeheer", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("#4fc5f7")
    return message.channel.send(xd);
  },
};
