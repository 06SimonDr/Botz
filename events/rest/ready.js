const fs = require('fs');

module.exports = {
	event: 'ready',
	async execute(client) {
        // SLASH COMMAND HANDLER
        const commandFolders = fs.readdirSync('./slash');
        for (const folder of commandFolders) {
	        const commandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
	        for (const file of commandFiles) {
		        const command = require(`../../slash/${folder}/${file}`);
                const data = {
                    name: command.name,
                    description: command.description,
                    options: command.args,
                }
                // await client.application?.commands.create(data);
                await client.guilds.cache.get('846649566723440640')?.commands.create(data);
		        client.slashCommands.set(command.name, command);
	        }
        }

        console.log(`Shard ${client.shard.id} done!`)

        setInterval(() => {
            const activities_list = [
                {name: "❓ | !help", type: "LISTENING"},
                {name: "🎉 | 40+ Commands", type: "LISTENING"},
                {name: `${client.guilds.cache.size} servers | ${client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0); }, 0)} users`, type: "PLAYING"},
            ];
    
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            client.user.setActivity(activities_list[index]);
        }, 10000);
	},
};