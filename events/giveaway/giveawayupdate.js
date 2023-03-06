const giveawaySchema = require("../../schemas/giveaway-schema")
const discord = require("discord.js")
const ms = require("ms")

module.exports = {
    event: 'ready',
	async execute(client) {

    setInterval(async () => {
        const results = await giveawaySchema.find()

        results.forEach(async (result) => {
            var { guildId, messageId, channelId, prize, winners, duration, endsOn, createdOn } = result
            var eindDatum = new Date(endsOn)
            var guild = await client.guilds.cache.get(guildId)
            if (!guild) return
            var channel = await guild.channels.cache.get(channelId)
            if (!channel) return
            var message = await channel.messages.fetch(messageId)
            if(!message) return
            var date = new Date().getTime()

            if(!(date>endsOn)) {
            var embed = new discord.MessageEmbed()
                .setAuthor("🎉🎉 GIVEAWAY 🎉🎉")
                .setTitle(prize)
                .setDescription(`Reageren met 🎉 om deel te nemen!\nResterende tijd: **${ms(endsOn-date)}**!\n${winners} Winnaar(s)`)
                .setFooter(`© Botz 2021 | Eindigd`)
                .setTimestamp(eindDatum)
                .setColor("#4fc5f7")
            return await message.edit({ embeds: [embed] })
            }

            if(date>endsOn) {
                const { reactions } = message
                const reaction = reactions.cache.get('🎉')
                const users = await reaction.users.fetch()
                const entries = users.filter(user => !user.bot).array()

                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].id == client.user.id) {
                        entries.splice(i, 1);
                        continue;
                    }
                }

                if (entries.length == 0) {
                    var geenWinnaars = new discord.MessageEmbed()
                        .setAuthor("🎉🎉 GIVEAWAY EINDE 🎉🎉")
                        .setTitle(prize)
                        .setDescription("Geen winnaars (Niemand heeft deelgenomen aan de giveaway.)")
                        .setFooter(`© Botz 2021 | Eindigd`)
                        .setTimestamp(eindDatum)
                        .setColor("#4fc5f7")
                    await message.edit({ embeds: [geenWinnaars] })
                    await giveawaySchema.deleteOne({
                        guildId: guild.id,
                        channelId: channel.id,
                        messageId: message.id
                    })
                    return message.channel.send(`Niemand heeft deelgenomen aan de giveaway.\n${message.url}`);
                }

                let winnaars = determineWinners(entries, winners)
                winnaars = winnaars.map(user => user.toString()).join(' ');
                var endEmbed = new discord.MessageEmbed()
                    .setAuthor("🎉🎉 GIVEAWAY EINDE 🎉🎉")
                    .setTitle(prize)
                    .setDescription(`Winnaar(s): ${winnaars}`)
                    .setFooter(`© Botz 2021 | Beïndigd`)
                    .setTimestamp(eindDatum)
                    .setColor("#4fc5f7")
                await message.edit({ embeds: [EndEmbed] })
                channel.send(`🎉 Gefeliciteerd ${winnaars}, jullie winnen ${prize}!\n${message.url}`)
                await giveawaySchema.deleteOne({
                    guildId: guild.id,
                    channelId: channel.id,
                    messageId: message.id
                })
            }
        })
    }, 3000)
}
}

function determineWinners(users, max) {
    if (users.length <= max) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while (i < max) {
        const random = Math.floor(Math.random() * users.length);
        const selected = users[random];
        if (!numbers.has(random)) {
            winnersArray.push(selected);
            i++;
        }
    }
    return winnersArray;
}