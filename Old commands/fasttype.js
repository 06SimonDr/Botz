const { MessageEmbed } = require('discord.js')
const schema = require('../schemas/fasttype-schema')

const words = ['discord', 'tweeëntwintig', 'slapeloze', 'tevergeefs', 'parlementaire', 'oorverdovend', 'gênante', 'orang-oetang', 'gecompliceerd', 'toiletgebruik', 'dwerg', 'rijst', 'youtube', 'muziek', 'afvoer', 'kwaliteit', 'leger', 'loods', 'tijdbalk', 'veeteelt', 'vastlopen', 'activiteit', 'aanleggen', 'tafel', 'eten', 'boek', 'agenda', 'atlas', 'azielzoeker', 'bezoeker', 'gebruik', 'school', 'potlood', 'pen', 'gum', 'vervolg', 'verplicht', 'vergroten', 'gewoonte', 'conflict', 'bereikbaar', 'neerslag', 'verklaren', 'verschuiven', 'geheugen', 'geschikt', 'gedachte', 'veroorzaken', 'kleren', 'druk', 'slapen', 'game', 'poging', 'lelijk', 'flessen', 'piano', 'radio', 'druppel', 'leren', 'developer', 'sporten', 'verwarming', 'meubel', 'kast', 'gloeilamp', 'slaapkamer', 'badkuip', 'balkon']
const passedWords = []
  
  
module.exports = {
    description: 'Type zoveel mogelijk woorden in 60 seconden!', // Required for slash commands
    aliases: ['ft'],
    category: 'games', 
    callback: async ({ message }) => {

        message.delete()
        var startBericht = await message.channel.send(`De fast type game start in **3** seconden!`)
        var seconds = 3
        var countdown = setInterval(async function() {
            seconds--;
            startBericht.edit(`De fast type game start in **${seconds}** seconden!`)
            if (seconds <= 0) {
                clearInterval(countdown);
                startBericht.delete()
                const punten = await game(message, words)
        const result = await schema.findById(message.author.id)
        if (result) {
        const puntenMongo = result.points
        if (punten > puntenMongo) {
            await schema.findOneAndUpdate(
                {
                    _id: message.author.id
                },
                {
                    _id: message.author.id,
                    points: punten
                },
                {
                    upsert: true
                }
            )
        }
        } else {
            await schema.findOneAndUpdate(
                {
                    _id: message.author.id
                },
                {
                    _id: message.author.id,
                    points: punten
                },
                {
                    upsert: true
                }
            )
        }
        const pointList = []
        const results = await schema.find().sort({ points: -1 })
        if (!results) return
        var winners = ''
        var winnersServer = ''
        var plaats = 1
        var top10 = results.slice(0, 10)
        top10.forEach(top => {
            winners += `${plaats}. <@${top._id}> ${top.points} punten\n`
            ++plaats
        })
        var serverPlaats = 1
        results.forEach(top => {
            if (message.guild.members.cache.has(top._id)) {
                if (serverPlaats <= 10) {
            winnersServer += `${serverPlaats}. <@${top._id}> ${top.points} punten\n`
            ++serverPlaats
        }
        }
        })
        var endEmbed = new MessageEmbed()
            .setTitle('Scoreboard')
            .setDescription(`Je behaalde ${punten} punten!`)
            .addField('Bot top 10', winners)
            .addField('Server top 10', winnersServer)
            .setColor("#4fc5f7")
            .setFooter("© Botz 2021")
            .setTimestamp();
        message.channel.send(endEmbed)
            }
        }, 1000);
    }
}

async function game(message, words) {
    var points = 0
        var datum = new Date(Date.now()).getTime()
        
        while (new Date(Date.now()).getTime() < datum + 60000) {

            var randomNumber = Math.floor(Math.random()*words.length);
            if (!passedWords.includes(words[randomNumber])) {
            var msg = await message.channel.send(words[randomNumber])
            const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
            msg.delete()
            const { content } = response.first()
            response.first().delete()
            if (content === words[randomNumber]) {
            passedWords.push(content)
            ++points
            }
        }
        }
        return points
}