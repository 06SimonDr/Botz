const discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require('fs');
require('dotenv').config();

const client = new discord.Client({
    allowedMentions: { parse: ['users'], repliedUser: true },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']
})

client.commands = new discord.Collection();
client.slashCommands = new discord.Collection();
client.queue = new Map()

mongoose.connect(process.env.MONGO, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// COMMAND HANDLER
const commandFolders = fs.readdirSync('./commands');
for (const commandFolder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${commandFolder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${commandFolder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// EVENT HANDLER
const eventFolders = fs.readdirSync('./events');
for (const eventFolder of eventFolders) {
	const eventFiles = fs.readdirSync(`./events/${eventFolder}`).filter(file => file.endsWith('.js'));
	for (const eventFile of eventFiles) {
		const event = require(`./events/${eventFolder}/${eventFile}`);
		if (event.once) {
			client.once(event.event, (...args) => event.execute(...args, client));
		} else {
			client.on(event.event, (...args) => event.execute(...args, client));
		}
	}
}

client.on("error", console.error);
client.on("warn", console.warn);

client.login(process.env.TOKEN)