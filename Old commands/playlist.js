const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
var ytpl = require("ytpl");
const sendError = require("../util/error");
const { play } = require("../util/playing");
module.exports = {
    category: 'muziek',
	description: 'Speel een youtube playlist af.',
    callback: async ({message, args}) => {

        const channel = message.member.voice.channel;
        if (!channel) return sendError("Het spijt me, maar je moet een spraakkanaal hebben om muziek af te spelen!", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var searchString = args.join(" ");
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Ik kan geen verbinding maken met je spraakkanaal, zorg ervoor dat ik de juiste rechten heb!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Ik kan niet op dit spraakkanaal spreken, zorg ervoor dat ik de juiste machtigingen heb!", message.channel);

        if (!searchString || !url) return sendError(`Gebruik: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Naam>`, message.channel);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                const playlist = await ytpl(url.split("list=")[1]);
                if (!playlist) return sendError("Afspeellijst niet gevonden", message.channel);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send({
                    embed: {
                        color: "#4fc5f7",
                        description: `✅  **|**  Afspeellijst: **\`${videos[0].title}\`** is toegevoegd aan de wachtlijst`,
                    },
                });
            } catch (error) {
                console.error(error);
                return sendError("Afspeellijst niet gevonden :(", message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);

                if (searched.playlists.length === 0) return sendError("Het lijkt erop dat ik de afspeellijst niet kan vinden op YouTube", message.channel);
                var songInfo = searched.playlists[0];
                let listurl = songInfo.listId;
                const playlist = await ytpl(listurl);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                let thing = new MessageEmbed()
                    .setAuthor("Afspeellijst is toegevoegd aan wachtrij", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                    .setThumbnail(songInfo.thumbnail)
                    .setColor("#4fc5f7")
                    .setDescription(`✅  **|**  Afspeellijst: **\`${songInfo.title}\`** is toegevoegd \`${songInfo.videoCount}\` video naar de wachtrij`);
                return message.channel.send(thing);
            } catch (error) {
                return sendError("Er is een onverwachte fout opgetreden", message.channel).catch(console.error);
            }
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                views: video.views ? video.views : "-",
                ago: video.ago ? video.ago : "-",
                duration: video.duration,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                img: video.thumbnail,
                req: message.author,
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 80,
                    playing: true,
                    loop: false,
                };
                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);

                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(queueConstruct.songs[0], message);
                } catch (error) {
                    console.error(`Ik kon niet deelnemen aan het spraakkanaal: ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return sendError(`Ik kon niet deelnemen aan het spraakkanaal: ${error}`, message.channel);
                }
            } else {
                serverQueue.songs.push(song);
                if (playlist) return;
                let thing = new MessageEmbed()
                    .setAuthor("Nummer is toegevoegd aan wachtrij", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                    .setThumbnail(song.img)
                    .setColor("#4fc5f7")
                    .addField("Naam", song.title, true)
                    .addField("Tijd", song.duration, true)
                    .addField("Aangevraagd bij", song.req.tag, true)
                    .setFooter(`Views: ${song.views} | ${song.ago}`);
                return message.channel.send(thing);
            }
            return;
        }
    },
};
