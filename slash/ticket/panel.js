const ticketSchema = require("../../schemas/ticket-schema")
const discord = require("discord.js")
const { Permissions } = discord;

module.exports = {
    name: 'panel',
	description: 'Verander het ticket panel kanaal',
    args: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "De channel voor het ticket panel",
            required: true,
        },
    ],
    permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
    async execute(client, interaction, args) {

        const { guild } = interaction
        let Channel = guild.channels.cache.get(args[0])
        if (Channel.type === "voice") return interaction.reply({ content: `Geef een text channel mee!`, ephemeral: true });

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
        interaction.reply(`Ticket panel aangemaakt in ${Channel}.`)
}
}