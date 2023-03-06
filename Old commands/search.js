const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const { play } = require("../util/playing");
const yts = require("yt-search");
const YouTube = require("youtube-sr").default
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    category: 'muziek',
	description: 'Zoek een nummer op youtube.',
    callback: async ({message, args}) => {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Het spijt me, maar je moet een spraakkanaal hebben om muziek af te spelen!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Ik kan geen verbinding maken met je spraakkanaal, zorg ervoor dat ik de juiste machtigingen heb!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Ik kan niet op dit spraakkanaal spreken, zorg ervoor dat ik de juiste machtigingen heb!", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("Je wilde niet dat ik wilde zoeken", message.channel);

        var serverQueue = message.client.queue.get(message.guild.id);
        try {
            var searched = await YouTube.search(searchString, { limit: 10 });
            if (searched[0] == undefined) return sendError("Het lijkt erop dat ik het nummer niet kan vinden op YouTube", message.channel);
            let index = 0;
            let embedPlay = new MessageEmbed()
                .setColor("#4fc5f7")
                .setAuthor(`Resultaten voor \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                .setDescription(`${searched.map((video2) => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                .setFooter("Typ het nummer van het nummer om het aan de afspeellijst toe te voegen");
            // eslint-disable-next-line max-depth
            message.channel.send(embedPlay).then((m) =>
                m.delete({
                    timeout: 15000,
                })
            );
            try {
                var response = await message.channel.awaitMessages((message2) => message2.content > 0 && message2.content < 11, {
                    max: 1,
                    time: 20000,
                    errors: ["time"],
                });
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "#4fc5f7",
                        description: "Er is binnen 20 seconden niets geselecteerd, de aanvraag is geannuleerd.",
                    },
                });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await searched[videoIndex - 1];
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    color: "#4fc5f7",
                    description: "🆘  **|**  Ik kon geen zoekresultaten krijgen",
                },
            });
        }

        response.delete();
        var songInfo = video;

        const song = {
            id: songInfo.id,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, " "),
            ago: songInfo.uploadedAt,
            duration: songInfo.durationFormatted,
            url: `https://www.youtube.com/watch?v=${songInfo.id}`,
            img: songInfo.thumbnail.url,
            req: message.author,
        };

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
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

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
