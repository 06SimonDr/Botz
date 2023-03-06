/* eslint-disable no-unused-vars */
const ticketSchema = require("../../schemas/ticket-user-schema")
module.exports = {
	category: 'ticket',
	description: 'Heropen een ticket.',
    callback: async ({message, args}) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Je hebt geen perms om het ticket opnieuw te openen.")
		const result = await ticketSchema.findOne({closedTickets: message.channel.id})
		if (result === null) return message.reply("Je moet in een ticket zitten om dit command te kunnen uitvoeren.")
		const { _id } = result
		var idList = _id.split("|")

		var member = message.guild.members.cache.get(idList[0])

	try {
		message.channel.updateOverwrite(member.user, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			ATTACH_FILES: true,
			READ_MESSAGE_HISTORY: true,
		})
			.then(() => {
				message.channel.send(`Succesvol heropend ${message.channel}`);
			});
			await ticketSchema.findOneAndUpdate(
				{
					_id: `${member.id}|${message.guild.id}`
				},
				{
					_id: `${member.id}|${message.guild.id}`,
					ticket: true,
					ticketChannel: message.channel.id,
                    $pull: {
					closedTickets: message.channel.id
				}
				},
				{
					upsert: true
				}
			)
		}
		catch (e) {
			return message.channel.send('Er is een fout opgetreden, probeer het opnieuw!');
		}
	},
};