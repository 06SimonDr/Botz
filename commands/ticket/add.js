const ticketSchema = require("../../schemas/ticket-user-schema")

module.exports = {
	name: 'add',
	category: 'ticket',
	description: 'Voeg iemand toe aan een ticket',
	minArgs: 1,
	usage: '<gebruiker>',
	async execute(client, message, args, prefix) {
		const result = await ticketSchema.findOne({ serverId: message.guild.id, ticketChannel: message.channel.id })
		if (result === null) return message.reply("Je moet in een ticket zitten om dit command te kunnen uitvoeren.")
		const { serverId, userId } = result
		var ticketOwner = userId
		if(!message.member.hasPermission('MANAGE_CHANNELS')) if(message.author.id !== ticketOwner.id) return message.reply("Je hebt geen perms om iemand aan dit ticket toe te voegen.")
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Onjuist gebruik! \nGebruik: ${prefix}add <gebruiker>`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					message.channel.send(`Succesvol toegevoegd ${member} naar ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('Er is een fout opgetreden, probeer het opnieuw!');
			}

			await ticketSchema.findOneAndUpdate(
				{
					serverId: message.guild.id,
					userId: ticketOwner.id
				},
				{
					serverId: message.guild.id,
					userId: ticketOwner.id,
					$push: {
						members: member.id
					}
				},
				{
					upsert: true
				}
			)
	}
};