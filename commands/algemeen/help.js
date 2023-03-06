const discord = require("discord.js");

module.exports = {
	name: "help",
	category: 'informatie',
	description: 'Help menu',
	aliases: ['commands'],
	maxArgs: 1,
	usage: "[command]",
    async execute(client, message, args, prefix) {

		var commandList = []

		var automod = ""
		var games = ""
		var giveaway = ""
		var informatie = ""
		var instellingen = ""
		var muziek = ""
		var suggestie = ""
		var ticket = ""

		var automod2 = 0
		var games2 = 0
		var giveaway2 = 0
		var informatie2 = 0
		var instellingen2 = 0
		var muziek2 = 0
		var suggestie2 = 0
		var ticket2 = 0

		const { commands } = client;
		commands.map(command => {
			var constructor = {
				name: command.name,
				description: command.description,
				category: command.category
			}
			commandList.push(constructor);
		})

		for (let i = 0; i < commandList.length; i++) {
			const command = commandList[i];

		if (command["category"] == "automod") {
			automod += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			automod2 += 1
		}

		if (command["category"] == "games") {
			games += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			games2 += 1
		}

		if (command["category"] == "giveaway") {
			giveaway += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			giveaway2 += 1
		}

		if (command["category"] == "informatie") {
			informatie += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			informatie2 += 1
		}

		if (command["category"] == "instellingen") {
			instellingen += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			instellingen2 += 1
		}

		if (command["category"] == "muziek") {
			muziek += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			muziek2 += 1
		}

		if (command["category"] == "suggestie") {
			suggestie += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			suggestie2 += 1
		}

		if (command["category"] == "ticket") {
			ticket += "`"+prefix+command["name"]+"` - "+command["description"]+"\n";
			ticket2 += 1
		}
	}

		var botEmbed = new discord.MessageEmbed()
        	.setTitle("Help")
    		.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        	.setColor("#4fc5f7")
    		.addField("**:man_police_officer:┆Auto mod**", "`"+automod2+" commands`", true)
    		.addField("**:notes:┆Muziek**", "`"+muziek2+" commands`", true)
    		.addField("**:gear:┆Instellingen**", "`"+instellingen2+" commands`", true)
    		.addField("**:video_game:┆Games**", "`"+games2+" commands`", true)
    		.addField("**:bulb:┆Suggestions**", "`"+suggestie2+" commands`", true)
    		.addField("**:partying_face:┆Giveaway**", "`"+giveaway2+" commands`", true)
    		.addField("**:information_source:┆Informatie**", "`"+informatie2+" commands`", true)
    		.addField("**:ticket:┆Tickets**", "`"+ticket2+" commands`", true)
    		.addField("**:radio:┆Radio**", "`11 commands`", true)
    		.setFooter("© Botz 2021")
    		.setTimestamp();


		var autoEmbed = new discord.MessageEmbed()
			.setTitle("**⚠️ || Error!**")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(" We zijn moneteel bezig met dit command!")
			.setFooter("© Botz 2021")
			.setTimestamp();

		var gamesEmbed = new discord.MessageEmbed()
			.setTitle("Help games")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(games)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var giveawayEmbed = new discord.MessageEmbed()
			.setTitle("Help giveaway")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(giveaway)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var infoEmbed = new discord.MessageEmbed()
			.setTitle("Help informatie")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(informatie)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var instellingenEmbed = new discord.MessageEmbed()
			.setTitle("Help instellingen")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(instellingen)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var muziekEmbed = new discord.MessageEmbed()
			.setTitle("Help muziek")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(muziek)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var radioEmbed = new discord.MessageEmbed()
        	.setTitle("Help radio")
    		.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
			.setDescription("`!radio Qmusic` - Speel Qmusic af.\n`!radio Qmusic-Nonstop` - Speel Qmusic-Nonstop af.\n`!radio Skyradio` - Speel Skyradio af.\n`!radio Skyradio-Nonstop` - Speel Skyradio-Nonstop af.\n`!radio Radio538` - Speel Radio538 af.\n`!radio Radio538-Nonstop` - Speel Radio538-Nonstop af.\n`!radio 100%NL` - Speel 100%NL af.\n`!radio 100%NL-Nonstop` - Speel 100%NL-Nonstop af.\n`!radio Slam` - Speel Slam af.\n`!radio Slam-Nonstop` - Speel Slam-Nonstop af.\n`!radio Slam-HardStyle` - Speel Slam-HardStyle af.\n`!radio Veronica` - Speel Veronica af.\n`!radio Veronica-Nonstop` - Speel Veronica-Nonstp af.")
            .setFooter("© Botz 2021")
    		.setTimestamp()

		var suggestieEmbed = new discord.MessageEmbed()
			.setTitle("Help suggesties")
			.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
			.setColor("#4fc5f7")
			.setDescription(suggestie)
			.setFooter("© Botz 2021")
			.setTimestamp();

		var ticketEmbed = new discord.MessageEmbed()
        	.setTitle("Help tickets")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        	.setColor("#4fc5f7")
			.setDescription(ticket)
    		.setFooter("© Botz 2021")
    		.setTimestamp();

					const reactions = ['👮‍♂️', '🎶', '⚙️', '🎮', '💡']
					const reactions2 = ['🥳', 'ℹ', '🎫', '📻', '🏠']

					var row = new discord.MessageActionRow()
					for (const reaction of reactions) {
        				row.addComponents(
							new discord.MessageButton()
								.setCustomID(reaction)
								.setStyle('PRIMARY')
								.setEmoji(reaction)
						);
					}
					var row2 = new discord.MessageActionRow()
					for (const reaction of reactions2) {
        				row2.addComponents(
							new discord.MessageButton()
								.setCustomID(reaction)
								.setStyle('PRIMARY')
								.setEmoji(reaction)
						);
					}

			var msg = await message.channel.send({ embeds: [botEmbed], components: [row, row2] })

				await helpMenu()
				async function helpMenu() {
				const filter = i => i.user.id === message.author.id;
			var button = await msg.awaitMessageComponentInteraction(filter)
			var emoji = button.customID;

					if (emoji === "👮‍♂️") {
						
						button.update({ embeds: [autoEmbed] })
						await helpMenu()

					} else if (emoji === "🎶") {
				
						button.update({ embeds: [muziekEmbed] })
						await helpMenu()

					} else if (emoji === "⚙️") {
				
						button.update({ embeds: [instellingenEmbed] })
						await helpMenu()

					} else if (emoji === "🎮") {
				
						button.update({ embeds: [gamesEmbed] })
						await helpMenu()

					} else if (emoji === "💡") {
				
						button.update({ embeds: [suggestieEmbed] })
						await helpMenu()

					} else if (emoji === "🥳") {
				
						button.update({ embeds: [giveawayEmbed] })
						await helpMenu()

					} else if (emoji === "ℹ") {
				
						button.update({ embeds: [infoEmbed] })
						await helpMenu()

					} else if (emoji === "🎫") {
				
						button.update({ embeds: [ticketEmbed] })
						await helpMenu()

					} else if (emoji === "📻") {
				
						button.update({ embeds: [radioEmbed] })
						await helpMenu()
						
					} else if (emoji === "🏠") {
				
						button.update({ embeds: [botEmbed] })
						await helpMenu()

					}
				}
}
}