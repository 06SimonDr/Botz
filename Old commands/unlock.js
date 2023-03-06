module.exports = {
	category: 'moderatie',
	description: 'Unlock een channel in lockdown.',
    callback: async ({message, args}) => {

	if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan het niet");
    
	await message.channel.overwritePermissions([
    
    	{
    		id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
            allow: ['SEND_MESSAGES']
    	}
    
    ]);

	message.channel.send("Kanaal is niet meer in lockdown!");
    
}
}