const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const util = require("../util/pagination");

module.exports = {
    category: 'muziek',
	description: 'Krijg de wachtrij.',
    aliases: ["q", "list", "songlist", "song-list", "wachtrij"],
    callback: async ({message, args}) => {
        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"])) return sendError("Ontbrekende toestemming om berichten te beheren of reacties toe te voegen", message.channel);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("Er wordt niets afgespeeld op deze server.", message.channel);

        const que = queue.songs.map((t, i) => `\`${++i}.\` | [\`${t.title}\`](${t.url}) - [<@${t.req.id}>]`);

        const chunked = util.chunk(que, 10).map((x) => x.join("\n"));

        const embed = new MessageEmbed()
            .setAuthor("Wachtrij met servernummers", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setThumbnail(message.guild.iconURL())
            .setColor("#4fc5f7")
            .setDescription(chunked[0])
            .addField("Nu aan het spelen", `[${queue.songs[0].title}](${queue.songs[0].url})`, true)
            .addField("Tekstkanaal", queue.textChannel, true)
            .addField("Spraakkanaal", queue.voiceChannel, true)
            .setFooter(`Momenteel is het servervolume ${queue.volume} | Pagina 1 van de ${chunked.length}.`);
        if (queue.songs.length === 1) embed.setDescription(`Geen nummers om de volgende nummers toe te voegen \`\`${message.client.config.prefix}play <song_naam>\`\``);

        try {
            const queueMsg = await message.channel.send(embed);
            if (chunked.length > 1) await util.pagination(queueMsg, message.author, chunked);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    },
};
