const discord = require("discord.js")
const giveawaySchema = require("../../schemas/giveaway-schema")

module.exports = {
    category: 'giveaway',
    description: 'Beëindig een lopende giveaway.',
    callback: async ({client, message, args, prefix}) => {

        //if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Je hebt geen perms om een giveaway te eindigen!');
        if(!args[0]) return message.reply('Geen message id opegegeven.')

        const result = await giveawaySchema.findOne({
            guildId: message.guild.id,
            messageId: args[0]
        })
        if (result === null) return message.reply('Geen giveaway gevonden!')

        var { guildId, messageId, channelId, prize, winners, duration, endsOn, createdOn } = result

        var guild = await client.guilds.cache.get(guildId)
        if (!guild) return message.reply('Er is iets misgelopen!')
        var channel = await guild.channels.cache.get(channelId)
        if (!channel) return message.reply('Er is iets misgelopen!')
        var message = await channel.messages.fetch(messageId)
        if(!message) return message.reply('Er is iets misgelopen!')

        var eindDatum = new Date(endsOn)
        const { reactions } = message
        const reaction = reactions.cache.get('🎉')
        const users = await reaction.users.fetch()
        const entries = users.filter(user => !user.bot).array()

        let winnaars = determineWinners(entries, winners)
                winnaars = winnaars.map(user => user.toString()).join(' ');
                var endEmbed = new discord.MessageEmbed()
                    .setAuthor("🎉🎉 GIVEAWAY EINDE 🎉🎉")
                    .setTitle(prize)
                    .setDescription(`Winnaar(s): ${winnaars}`)
                    .setFooter(`© Botz 2021 | Beïndigd`)
                    .setTimestamp(eindDatum)
                    .setColor("#4fc5f7")
                await message.edit(endEmbed)
                channel.send(`🎉 Gefeliciteerd ${winnaars}, jij winnen ${prize}!\n${message.url}`)
                await giveawaySchema.deleteOne({
                    guildId: guild.id,
                    channelId: channel.id,
                    messageId: message.id
                })
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