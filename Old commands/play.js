const { play } = require("../util/playing");
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    category: 'muziek',
	description: 'Speel een nummer af.',
    callback: async ({message, args}) => {

        let channel = message.member.voice.channel;
        if (!channel) return sendError("Sorry, je moet in een spraak kanaal zitten!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Ik kan geen verbinding maken met je spraakkanaal, zorg ervoor dat ik de juiste permission heb!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Ik kan niet op dit spraakkanaal spreken, zorg ervoor dat ik de juiste permission heb!", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("Je wilde niet dat ik wilde spelen", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo;
        let song;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                songInfo = await ytdl.getInfo(url);
                if (!songInfo) return sendError("Het lijkt erop dat ik het nummer niet kan vinden op YouTube", message.channel);
                song = {
                    id: songInfo.videoDetails.videoId,
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    ago: songInfo.videoDetails.publishDate,
                    views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
            try {
                songInfo = await scdl.getInfo(url);
                if (!songInfo) return sendError("Het lijkt erop dat ik het nummer niet kon vinden op SoundCloud", message.channel);
                song = {
                    id: songInfo.permalink,
                    title: songInfo.title,
                    url: songInfo.permalink_url,
                    img: songInfo.artwork_url,
                    ago: songInfo.last_modified,
                    views: String(songInfo.playback_count).padStart(10, " "),
                    duration: Math.ceil(songInfo.duration / 1000),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return sendError(error.message, message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);
                if (searched.videos.length === 0) return sendError("Het lijkt erop dat ik het nummer niet kan vinden op YouTube", message.channel);

                songInfo = searched.videos[0];
                song = {
                    id: songInfo.videoId,
                    title: Util.escapeMarkdown(songInfo.title),
                    views: String(songInfo.views).padStart(10, " "),
                    url: songInfo.url,
                    ago: songInfo.ago,
                    duration: songInfo.duration.toString(),
                    img: songInfo.image,
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
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

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 80,
            playing: true,
            loop: false,
        };
        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0], message);
        } catch (error) {
            console.error(`Ik kon niet deelnemen aan het spraakkanaal: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`Ik kon niet deelnemen aan het spraakkanaal: ${error}`, message.channel);
        }
    },
};
