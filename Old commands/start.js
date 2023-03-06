const discord = require("discord.js")
const giveawaySchema = require("../../schemas/giveaway-schema")
const ms = require("ms")

const prompts = [
    'In welke channel wil je de giveaway starten?',
    'Wat wil je weggeven?',
    'Hoelang moet de giveaway duren?',
    'Hoeveel mensen winnen er?'
]

module.exports = {
    category: 'giveaway',
    description: 'Start een giveaway.',
    callback: async ({client, message, args, prefix}) => {
        try {
            const response = await getResponses(message);
            var embed = new discord.MessageEmbed()
                .setTitle("Bevestig Giveaway")
                .setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
                .addField('Prijs:', response.prize, true)
                .addField('Winnaars:', response.winners, true)
                .addField('Channel:', message.guild.channels.cache.get(response.channelId), true)
                .addField('Tijd:', response.duration, true)
                .setFooter(`© Botz 2021`)
                .setColor("#4fc5f7")
                .setTimestamp();
            const msg = await message.channel.send(embed)
            await msg.react('✅')
            await msg.react('❌')

            const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
            const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] });
            const choice = reactions.get('✅') || reactions.get('❌')
            if (choice.emoji.name === '✅') {
                response.endsOn = new Date(Date.now() + ms(response.duration)).getTime();
                const giveawayEmbed = new discord.MessageEmbed()
                    .setAuthor("🎉🎉 GIVEAWAY 🎉🎉")
                    .setTitle(response.prize)
                    .setDescription(`Reageren met 🎉 om deel te nemen!\nResterende tijd: **${response.duration}**!\n${response.winners} Winnaar(s)`)
                    .setFooter(`© Botz 2021 | Eindigd`)
                    .setTimestamp(response.endsOn)
                    .setColor("#4fc5f7")
                const giveawayMsg = await message.guild.channels.cache.get(response.channelId).send(giveawayEmbed);
                await giveawayMsg.react('🎉')
                response.messageId = giveawayMsg.id
                response.guildId = giveawayMsg.guild.id
                await new giveawaySchema({
                    guildId: response.guildId,
                    messageId: response.messageId,
                    channelId: response.channelId,
                    prize: response.prize,
                    winners: response.winners,
                    duration: response.duration,
                    endsOn: response.endsOn,
                    createdOn: new Date().getTime()
                }).save()
            }
            if (choice.emoji.name === '❌') {
                message.channel.send('Geannuleerd!')
            }
        } catch (err) {
            console.log(err)
            message.reply('Er is iets misgelopen, de foutmelding is doorgegeven aan de developers.')
        }
    }
}

async function getResponses(message) {

    const validTime = /^\d+(s|m|h|d)$/;
    const validNumber = /\d+/;
    const responses = { }

    for (let i = 0; i < prompts.length; i++) {
        await message.channel.send(prompts[i])
        const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
        const { content } = response.first()
        if (i === 0) {
            var channel = message.guild.channels.cache.get(content.replace('<#','').replace('>',''))
            if (channel) {
                responses.channelId = channel.id
            } else {
                return message.reply('Ongeldige channel meegegeven!')
            }
        } else if (i === 1) {
            responses.prize = content
        } else if (i === 2) {
            if (validTime.test(content)) {
                responses.duration = content
            } else {
                return message.reply('Ongeldig tijd formaat!')
            }
        } else if (i === 3) {
            if (validNumber.test(content)) {
                responses.winners = content
            } else {
                return message.reply('Ongeldig aantal winnaars opgegeven!')
            }
        }
    }
    return responses;
}