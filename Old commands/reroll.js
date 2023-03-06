module.exports = {
    category: 'giveaway',
    description: 'Reroll een lopende giveaway.',
    callback: async ({client, message, args, prefix}) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Je hebt geen perms om een giveaway te rerollen!');
        if(!args[0]) return message.reply('Geen bericht id opgegeven.')

        var msg = await message.channel.messages.fetch(args[0])
        if(!msg) return message.reply('Fout bericht id opgegeven.')

        var embed = msg.embeds[0]
        if (!embed.author === '🎉🎉 GIVEAWAY EINDE 🎉🎉') return message.reply('Geen giveaway gevonden.')

        const { reactions } = msg
        const reaction = reactions.cache.get('🎉')
        const users = await reaction.users.fetch()
        const entries = users.filter(user => !user.bot).array()

        let winnaars = determineWinners(entries)
        winnaars = winnaars.map(user => user.toString()).join(' ');

        message.channel.send(`🎉 ${winnaars} is de nieuwe winnaar!`)
    }
}

function determineWinners(users) {
    if (users.length <= 1) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while (i < 1) {
        const random = Math.floor(Math.random() * users.length);
        const selected = users[random];
        if (!numbers.has(random)) {
            winnersArray.push(selected);
            i++;
        }
    }
    return winnersArray;
}