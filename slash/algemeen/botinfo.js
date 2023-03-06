const { MessageEmbed } = require('discord.js')

module.exports = {
	name: "botinfo",
	description: 'Krijg de info van de bot',
    async execute(client, interaction, args) {

		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval('var count; this.guilds.forEach(guild => { count += guild.members.cache.size; count; })'),
			client.shard.fetchClientValues('channels.cache.size'),
		];

		const results = await Promise.all(promises)

		var embed = new MessageEmbed()
        .setTitle("Botinfo || Lijst")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
    	.setColor("#4fc5f7")
		.addField("Servers", `${results[0].reduce((acc, guildCount) => acc + guildCount, 0)}`, true)
		.addField("Channels", `${results[2].reduce((acc, guildCount) => acc + guildCount, 0)}`, true)
		.addField("Totale gebruikers", `${results[1]}`, true)
		.addField("Totale gebruikte RAM", `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
		.addField("Ping", + (Date.now() - interaction.createdTimestamp) + "ms", true)
    	.setThumbnail('https://i.imgur.com/IdkMnVj.png')
    	.setFooter("© Botz 2021")
    	.setTimestamp();
     
      interaction.reply({ embeds: [embed] })
  },
}