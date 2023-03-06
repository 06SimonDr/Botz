const discord = require("discord.js");

module.exports = {
    category: 'informatie',
	description: 'Krijg de invite voor de support server.',
    callback: ({message, args}) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("**Botz || Support**")
    	.setURL("https://discord.gg/V9mfyunXcB")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription(" Maak je server beter met Botz!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
    
    return message.channel.send(botEmbed);

}
}