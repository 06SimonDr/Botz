module.exports = {
	event: 'interaction', 
	async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        var command = client.slashCommands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'Er is een error opgetreden tijdens het uitvoeren van dit command.', ephemeral: true })
        var args = []
        interaction.options.forEach(option => {
            args.push(option.value)
        })
        if (command.guildOnly && message.channel.type === 'dm') interaction.reply({ content: 'Ik kan dit command niet in dm uitvoeren!', ephemeral: true });
        if (command.permissions) {
            const authorPerms = interaction.channel.permissionsFor(interaction.user);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
              return interaction.reply({ content: 'Je hebt de permissie `'+command.permissions+"` nodig om dit command te kunnen uitvoeren!", ephemeral: true });
            }
        }
        try {
		    command.execute(client, interaction, args);
	    } catch (error) {
		    console.error(error);
		    interaction.reply({ content: 'Er is een error opgetreden tijdens het uitvoeren van dit command.', ephemeral: true });
	    }
	},
};