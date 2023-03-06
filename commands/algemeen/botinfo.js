const { MessageEmbed } = require('discord.js')

module.exports = {
	name: "botinfo",
	category: 'informatie',
	description: 'Krijg de info van de bot',
    async execute(client, message, args, prefix) {

     var embed = new MessageEmbed()
        .setTitle("Botinfo || Lijst")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
    	.setColor("#4fc5f7")
        .addField("Servers", `${client.guilds.cache.size}`, true)
    	.addField("Channels", `${client.channels.cache.size}`, true)
    	.addField("Totale gebruikers", `${client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0); }, 0)}`, true)
		.addField("Totale gebruikte RAM", `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
		.addField("Ping", + (Date.now() - message.createdTimestamp) + "ms", true)
    	.setThumbnail('https://i.imgur.com/IdkMnVj.png')
    	.setFooter("© Botz 2021")
    	.setTimestamp();
     
      message.channel.send({ embeds: [embed] })
  },
}