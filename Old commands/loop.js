const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Loop het huidige nummer.',
    callback: ({message, args}) => {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "#4fc5f7",
                    description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "ingeschakeld" : "uitgeschakeld"}\`**`
                }
            });
        };
    return sendError("Er wordt niets afgespeeld op deze server.", message.channel);
  }
}
