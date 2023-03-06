const ticketSchema = require("../../schemas/ticket-user-schema");
const GuildSettings = require("../../schemas/settings");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  event: "interaction",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const { message, channel } = interaction;
    const { guild } = message;

    if (interaction.customID !== "reopenTicket") return;
    const result = await ticketSchema.findOne({
      serverId: guild.id,
      closedTickets: { $in: [interaction.channel.id] },
    });
    if (result === null) interaction.reply({ content: 'Dit ticket is al geopend!', ephemeral: true })
    const { userId, ticket } = result;
    if (ticket)
      return interaction.reply(`<@${userId}> heeft al een open ticket!`);

    const user = guild.members.cache.get(userId);
    if (!user)
      return interaction.reply(`${user} zit niet meer in deze server.`);

    await ticketSchema.findOneAndUpdate(
      {
        userId: user.id,
        serverId: guild.id,
      },
      {
        userId: user.id,
        serverId: guild.id,
        ticket: false,
        ticketChannel: interaction.channel.id,
        $pull: {
          closedTickets: interaction.channel.id,
        },
      },
      {
        upsert: true,
      }
    );

    interaction.channel.overwritePermissions([
      {
        id: user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
      },
    ]);

    const { prefix } = await GuildSettings.findOne({ serverId: guild.id });
    const embed = new MessageEmbed()
      .setTitle(`**Ticket heropend**`)
      .setColor("#4fc5f7")
      .setDescription(
        `Welkom bij jouw ticket ${user}, je kunt jouw ticket sluiten door op het slotje te klikken of ${prefix}close te typen.`
      )
      .setFooter("© Botz 2021")
      .setTimestamp();
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomID("closeTicket")
        .setStyle("PRIMARY")
        .setEmoji("🔒")
    );
    user.send(
      `Je ticket is heropend! Klik op ${channel} om uw ticket te bekijken.`
    );
    await message.delete();
    interaction.reply({ embeds: [embed], components: [row] });
  },
};
