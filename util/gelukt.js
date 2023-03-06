const { MessageEmbed } = require("discord.js")

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setTitle("**✅ || Succes!**")
    .setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
    .setColor("#4fc5f7")
    .setDescription(text)
    .setFooter("© Botz 2021")
    .setTimestamp();
    await channel.send(embed)
}
