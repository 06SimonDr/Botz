const ticketSchema = require("../../schemas/ticket-user-schema")

module.exports = {
	category: 'ticket',
	description: 'Maak een ticket aan.',
    callback: async ({message, args, prefix}) => {
		const result = await ticketSchema.findById(`${message.author.id}|${message.guild.id}`)
		if(result !== null) {
		var {ticket} = result;
		if(ticket === true) return message.reply("Je hebt al een ticket!")
		}

		message.guild.channels.create(`ticket-${message.author.username}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			await updateTicketSchema(message, channel)
			message.reply(`je hebt met succes een ticket aangemaakt! Klik a.u.b. op ${channel} om uw ticket te bekijken.`);
			channel.send(`Hey ${message.author}, welkom bij je ticket! Even geduld, we zullen binnenkort bij u zijn. Als u dit ticket wilt sluiten, type dan alstublieft \`${prefix}close\``);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(`Ticket ${message.author.username} gemaakt. Klik op het volgende om te bekijken <#${channel.id}>`);
			}
		});
	},
};


async function updateTicketSchema(message, channel) {
	await ticketSchema.findOneAndUpdate(
		{
			_id: `${message.author.id}|${message.guild.id}`
		},
		{
			_id: `${message.author.id}|${message.guild.id}`,
			ticket: true,
			ticketChannel: channel,
		},
		{
			upsert: true
		}
	)
}