const ticketSchema = require("../../schemas/ticket-schema")
const discord = require("discord.js")
const { Permissions } = discord;

module.exports = {
    name: 'panel',
    category: 'instellingen',
	description: 'Verander het ticket panel kanaal.',
    aliasses: ['ticketpanel'],
    permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
    async execute(client, message, args, prefix) {

        const { guild } = message
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!Channel) return message.channel.send(`Geef een channel mee!`);
        if (Channel.type === "voice") return message.channel.send(`Geef een text channel mee!`);

        const row = new discord.MessageActionRow()
			.addComponents(
				new discord.MessageButton()
					.setCustomID('🎫')
					.setStyle('PRIMARY')
                    .setEmoji('🎫')
			);

        var botEmbed = new discord.MessageEmbed()
            .setTitle("**Ticket Panel**")
            .setColor("#4fc5f7")
            .setDescription("Reageer met 🎫 om een ticket aan te maken.")
    	    .setFooter("© Botz 2021")
    	    .setTimestamp();

        var msg = await Channel.send({ embeds: [botEmbed], components: [row] })

        await ticketSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                messageId: msg.id
            },
            {
                upsert: true
            }
        )
        message.reply(`Ticket panel aangemaakt in ${Channel}.`)
}
}