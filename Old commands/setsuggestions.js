const { MessageEmbed } = require("discord.js");
const suggestieSchema = require("../schemas/suggestie-schema")

module.exports = {
    category: 'instellingen',
	description: 'Verander de suggestie channel.',
    callback: async ({message, args}) => {

        const { guild } = message
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Geef een channel mee!`);

        if (Channel.type === "voice") return message.channel.send(`Geef een text channel mee!`);

        await suggestieSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                channelId: Channel.id
            },
            {
                upsert: true
            }
        )

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`De suggestie channel is nu <#${Channel.id}>`)

        return message.channel.send(Embed);

    }
};