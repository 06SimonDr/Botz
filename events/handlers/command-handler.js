const GuildSettings = require("../../schemas/settings");
const botOwner = ["552132590044315668", "724977658496155679"]

module.exports = {
	event: 'message',
	async execute(message, client) {
            if (message.author.bot) return;
            var storedSettings = await GuildSettings.findOne({ serverId: message.guild.id });
            if (!storedSettings) {
              const newSettings = new GuildSettings({
                serverId: message.guild.id
              });
              await newSettings.save().catch(()=>{});
              storedSettings = await GuildSettings.findOne({ serverId: message.guild.id });
            }
            if (!message.content.startsWith(storedSettings.prefix)) return;
            const prefix = storedSettings.prefix;
            const messageArray = message.content.split(" ")
            const command = messageArray[0].toLowerCase()
            var commands = client.commands.get(command.slice(prefix.length)) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command.slice(prefix.length)));
            var args = messageArray.slice(1);
            if (!commands) return
            if (commands.ownerOnly) if (!botOwner.includes(message.author.id)) return;
            if (command.guildOnly && message.channel.type === 'dm') {
                return message.reply('Ik kan dit command niet in dm uitvoeren!');
            }
            if (commands.permissions) {
              const authorPerms = message.channel.permissionsFor(message.author);
              if (!authorPerms || !authorPerms.has(commands.permissions)) {
                return message.reply('Je hebt de permissie `'+commands.permissions+"` nodig om dit command te kunnen uitvoeren!");
              }
            }
            if (commands.minArgs) {
              if (commands.minArgs > args.length) {
              var reply = `Je hebt te weinig argumenten opgegeven!`;
              if (commands.usage) {
                reply += `\nGebruik: \`${prefix}${commands.name} ${commands.usage}\``;
              }
              return message.channel.send(reply);
            }
          }
          if (command.maxArgs) {
              if (commands.maxArgs < args.length) {
              var reply = `Je hebt te veel argumenten opgegeven!`;
              if (commands.usage) {
                reply += `\nGebruik: \`${prefix}${commands.name} ${commands.usage}\``;
              }
              return message.channel.send(reply);
            }
          }
            if (commands) {
              try {
                  commands.execute(client, message, args, prefix);
              } catch (error) {
                  console.error(error);
                  message.reply('Er is een error opgetreden tijdens het uitvoeren van dit command.');
              }
          }
	},
};