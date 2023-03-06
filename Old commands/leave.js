const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    category: 'muziek',
	description: 'Verwijder de bot uit het spraakkanaal.',
    callback: async ({message, args}) => {

        let channel = message.member.voice.channel;
        if (!channel) return sendError("Het spijt me, maar u moet in een spraakkanaal zijn!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("Ik zit niet in een spraakkanaal!", message.channel);
        if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("Je zit niet in het juiste spraakkanaal!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Ik probeer het spraakkanaal te verlaten...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Verlaat het spraakkanaal", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setColor("#4fc5f7")
            .setTitle("Success")
            .setDescription("🎶 Verlaat de spraakkanaal.")
            .setFooter("© Botz 2021")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Verlaat de spraakkanaal :C"));
}
}