const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  category: 'muziek',
	description: 'Skip tot een bepaald nummer.',
    callback: async ({message, args, client, prefix}) => {

    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "#4fc5f7",
                            description: `**Usage**: \`${prefix}skipto <number>\``
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Er is geen wachtrij.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`The queue is only ${queue.songs.length} songs long!`,message.channel).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return sendError(`:notes: De speler is gestopt en de wachtrij is gewist.: ${error}`, message.channel);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "#4fc5f7",
                            description: `${message.author} ⏭ skipped \`${args[0] - 1}\` liedje`
                        }
   
                   }).catch(console.error);
                   message.react("✅")

  },
};