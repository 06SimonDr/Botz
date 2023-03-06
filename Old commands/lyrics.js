const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../util/error");
const splitlyrics = require("../util/pagination");

module.exports = {
    category: 'muziek',
	description: 'Krijg de lyrics van het spelende nummer.',
    aliases: ["ly", "songtext"],
    callback: async ({message, args}) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("Er wordt niets afgespeeld.", message.channel).catch(console.error);

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = `Geen songteksten gevonden voor ${queue.songs[0].title}.`;
        } catch (error) {
            lyrics = `Geen songteksten gevonden voor ${queue.songs[0].title}.`;
        }
        const splittedLyrics = splitlyrics.chunk(lyrics, 1024);

        let lyricsEmbed = new MessageEmbed()
            .setAuthor(`${queue.songs[0].title} — Lyrics`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setThumbnail(queue.songs[0].img)
            .setColor("#4fc5f7")
            .setDescription(splittedLyrics[0])
            .setFooter(`Pagina 1 van de ${splittedLyrics.length}.`)
            .setTimestamp();

        const lyricsMsg = await message.channel.send(lyricsEmbed);
        if (splittedLyrics.length > 1) await splitlyrics.pagination(lyricsMsg, message.author, splittedLyrics);
    },
};
