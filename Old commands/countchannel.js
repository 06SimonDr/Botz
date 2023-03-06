const discord = require("discord.js")
const countSchema = require("../schemas/count-schema")

module.exports = {
    category: 'instellingen',
	description: 'Verander de counting channel.',
    callback: async ({message, args}) => {
        const { guild } = message

        if(!args[0]) return message.reply("Geen channel meegegeven.")
        const channel = message.mentions.channels.first() || message.channel

    await countSchema.findOneAndUpdate(
        {
            _id: guild.id
        },
        {
            _id: guild.id,
            channelId: channel.id,
            nummer: 0,
            lastUser: ".",
        },
        {
            upsert: true
        }
    )

    var embed = new discord.MessageEmbed()
        .setTitle("**Botz || Count channel**")
        .setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription(`De counting channel is veranderd naar ${channel}`)
        .setImage("https://i.imgur.com/IdkMnVj.png")
        .setFooter("© Botz 2021")
        .setTimestamp();

    message.channel.send(embed)
}
}