const discord = require("discord.js");

module.exports = {
	category: 'informatie',
	description: 'Stuur een bericht via de bot in een bepaalde channel',
    callback: ({message, args}) => {
    
    	var geenkanaal = new discord.MessageEmbed()
        .setTitle("**⚠️ || Error!**")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription("Geen juiste kanaal opgegeven!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
		
    	var geentitel = new discord.MessageEmbed()
        .setTitle("**⚠️ || Error!**")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription("Geen titel opgegeven!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
    
    	var geenbericht = new discord.MessageEmbed()
        .setTitle("**⚠️ || Error!**")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription("Geen bericht opegegeven!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
    
    	message.delete()
        let channel = message.mentions.channels.first();
        let titel = args[1] 
        let announcement = args.slice(2).join(" ");
        if(!channel)return message.channel.send(geenkanaal)
        if(!titel)return message.channel.send(geentitel)
        if(!announcement)return message.channel.send(geenbericht)
        var announceEmbed = new discord.MessageEmbed()
        .setTitle(`${titel}`)
		.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription(`${announcement}`)
        .setFooter("© Botz 2021")
        .setTimestamp();
        channel.send(announceEmbed);
    
    }
}