const ticketSchema = require("../../schemas/ticket-user-schema")

module.exports = {
	category: 'ticket',
	description: 'Verwijder iemand uit een ticket.',
    callback: async ({message, args}) => {
		const result = await ticketSchema.findOne({ticketChannel: message.channel.id})
		if (result === null) return message.reply("Je moet in een ticket zitten om dit command te kunnen uitvoeren.")
		const { _id, members } = result
		var idList = _id.split("|")

		var ticketOwner = message.guild.members.cache.get(idList[0])
        if(!message.member.hasPermission('MANAGE_CHANNELS')) if(message.author.id !== ticketOwner.id) return message.reply("Je hebt geen perms om iemand uit het ticket te verwijderen.")
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Onjuist gebruik! Correct gebruik:${prefix}remove <member>`);
			}
			if (!members.includes(member)) return message.reply("Gebruiker niet gevonden.")
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					message.channel.send(`Succesvol verwijderd ${member} van ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('Er is een fout opgetreden, probeer het opnieuw!');
			}

			await ticketSchema.findOneAndUpdate(
				{
					_id: `${ticketOwner.id}|${message.guild.id}`
				},
				{
					_id: `${ticketOwner.id}|${message.guild.id}`,
					ticket: false,
					$pull: {
						members: member.id
					}
				},
				{
					upsert: true
				}
			)
	},
};