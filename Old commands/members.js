const discord = require("discord.js");

module.exports.run = {
    category: 'informatie',
	description: 'Geeft de leden in de server weer.',
    callback: ({message, args}) => {

    var ledenTotal = message.guild.memberCount;

    var ledenEmbed = new discord.MessageEmbed()
        .setTitle("Members || Lijst")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
    	.setColor("#4fc5f7")
        .addDiscription(`De server heeft ${ledenTotal} leden monenteel`)
    	.setThumbnail('https://i.imgur.com/IdkMnVj.png')
    	.setFooter("© Botz 2021")
    	.setTimestamp();

    message.channel.send(ledenEmbed);

}
}