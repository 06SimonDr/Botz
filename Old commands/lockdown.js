module.exports = {
	category: 'moderatie',
	description: 'Lockdown een channel.',
    callback: async ({message, args}) => {

	if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan het niet");
    
	await message.channel.overwritePermissions([
    
    	{
    		id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
            deny: ['SEND_MESSAGES']
    	}
    
    ]);

	message.channel.send("Kanaal in lockdown");
    
}
}