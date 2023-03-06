const fs = require('fs');
var counter = 0;

module.exports = {
  name: "reload",
  description: "Reload een command, bot owner only!",
  ownerOnly: true,
  minArgs: 1,
  maxArgs: 1,
  usage: "<Command of --all>",
  async execute(client, message, args, prefix) {
    if (args[1] === '--slash') {
      if (args[0] === "--all") {
        var reloadMessage = await message.channel.send("Alle commands worden gereload...");
        const commandFolders = fs.readdirSync('./slash');
        client.slashCommands.forEach(async (command) => {
          const folderName = commandFolders.find(folder => fs.readdirSync(`./slash/${folder}`).includes(`${command.name}.js`));
          delete require.cache[require.resolve(`../../slash/${folderName}/${command.name}.js`)];
  
          try {
            const newCommand = require(`../../slash/${folderName}/${command.name}.js`);
            const data = {
              name: newCommand.name,
              description: newCommand.description,
              options: newCommand.args,
          }
            await client.guilds.cache.get('846649566723440640')?.commands.create(data);
            message.client.slashCommands.set(newCommand.name, newCommand);
            ++counter;
          } catch (error) {
            console.error(error);
            message.channel.send(
              `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
            );
          }
        });
        reloadMessage.edit(`${counter} commands gereload!`);
      } else {
          const commandFolders = fs.readdirSync('./slash');
          const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
          const folderName = commandFolders.find(folder => fs.readdirSync(`./slash/${folder}`).includes(`${commandName}.js`));
  
        if (!command) {
          return message.channel.send(
            `Er is geen command met de naam \`${commandName}\`, ${message.author}!`
          );
        }
        delete require.cache[require.resolve(`../../slash/${folderName}/${command.name}.js`)];
  
        try {
          const newCommand = require(`../../slash/${folderName}/${command.name}.js`);
          const data = {
            name: newCommand.name,
            description: newCommand.description,
            options: newCommand.args,
        }
          await client.guilds.cache.get('846649566723440640')?.commands.create(data);
          message.client.commands.set(newCommand.name, newCommand);
          message.channel.send(`Command \`${newCommand.name}\` is gereload!`);
        } catch (error) {
          console.error(error);
          message.channel.send(
            `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
          );
        }
      }
    }
    else {
    if (args[0] === "--all") {
      var reloadMessage = await message.channel.send("Alle commands worden gereload...");
      const commandFolders = fs.readdirSync('./commands');
      client.commands.forEach(async (command) => {
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
          const newCommand = require(`../${folderName}/${command.name}.js`);
          message.client.commands.set(newCommand.name, newCommand);
          ++counter;
        } catch (error) {
          console.error(error);
          message.channel.send(
            `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
          );
        }
      });
      reloadMessage.edit(`${counter} commands gereload!`);
    } else {
        const commandFolders = fs.readdirSync('./commands');
        const commandName = args[0].toLowerCase();
      const command = message.client.commands.get(commandName) || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

      if (!command) {
        return message.channel.send(
          `Er is geen command met de naam \`${commandName}\`, ${message.author}!`
        );
      }
      delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

      try {
        const newCommand = require(`../${folderName}/${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Command \`${newCommand.name}\` is gereload!`);
      } catch (error) {
        console.error(error);
        message.channel.send(
          `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
        );
      }
    }
  }
  },
};