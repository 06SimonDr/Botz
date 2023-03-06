const discord = require("discord.js");

module.exports = {
    category: 'informatie',
	description: 'Krijg alle informatie over de server.',
    callback: async ({message, args, client}) => {
    
    var ledenTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    var people = ledenTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;
    var owner = message.guild.owner;
    var textchannel = message.member.name;

    var serverEmbed = new discord.MessageEmbed()
            .setTitle("Server Info || Lijst")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
    		.addField("Server naam:", message.guild.name, true )
    		.addField("Owner:", owner, true )
    		.addField("Members:", people, true )
    		.addField("Bots:", bots, true )
    		.addField("Je bent deze server gejoind op", message.member.joinedAt, true )	
			.addField("Tekst Kanalen:", `${message.guild.channels.cache.filter(chan => chan.type === 'text').size}`, true )
			.addField("Praat Kanalen:", `${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}`, true )
			.addField("Roles:", message.guild.roles.cache.size, true )
            .addField("Bot Naam:", client.user.username, true )
			.setThumbnail('https://i.imgur.com/IdkMnVj.png')
			.setFooter("© Botz 2021")
    	    .setTimestamp();

        return message.channel.send(serverEmbed);

}
}