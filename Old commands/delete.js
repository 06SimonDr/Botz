const ticketSchema = require("../../schemas/ticket-user-schema")

module.exports = {
	category: 'ticket',
	description: 'Verwijder een opgegeven ticket.',
	callback: async ({message}) => {


		var result = await ticketSchema.findOne({closedTickets: message.channel.id})
		if (result === null) return message.reply("Je moet in een gesloten ticket zitten om dit command te kunnen uitvoeren.")

		const { _id } = result
		var idList = _id.split("|")

		var member = message.guild.members.cache.get(idList[0])
		if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Je hebt geen perms om dit ticket te sluiten.")

		await ticketSchema.findOneAndUpdate(
			{
				_id: `${member.id}|${message.guild.id}`
			},
			{
				_id: `${member.id}|${message.guild.id}`,
				ticket: false,
				$pull: {
					closedTickets: message.channel.id
				}
			},
			{
				upsert: true
			}
		)

		message.channel.delete();
		
	},
};