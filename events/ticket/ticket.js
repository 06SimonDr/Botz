const ticketSchema = require("../../schemas/ticket-schema");
const ticketUserSchema = require("../../schemas/ticket-user-schema");
const GuildSettings = require("../../schemas/settings");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  event: "interaction",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const { message, user } = interaction;
    const { guild } = message;

    const result = await ticketSchema.findById(guild.id);
    if (result === null) return;
    var { messageId, supportRole, category } = result;
    if (message.id !== messageId) return;
    if (interaction.customID !== "🎫") return;

    const userResult = await ticketUserSchema.findOne({
      userId: user.id,
      serverId: guild.id,
    });
    if (userResult !== null) {
      var { ticket, ticketChannel } = userResult;
      if (ticket === true) {
        if (guild.channels.cache.get(ticketChannel))
          return user.send("Je hebt al een ticket!");
        else {
          await ticketUserSchema.findOneAndUpdate(
            {
              userId: user.id,
              serverId: guild.id,
            },
            {
              userId: user.id,
              serverId: guild.id,
              ticket: false,
              ticketChannel: null,
            },
            {
              upsert: true,
            }
          );
        }
      }
    }

    var channel = await guild.channels.create(`ticket-${user.username}`, {
      type: "text",
    });

    if (category) {
      var channel = await channel.setParent(category);
    }
    channel.overwritePermissions([
      {
        id: guild.roles.everyone,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
      },
    ]);
    if (supportRole) {
      for(const role of supportRole) {
        channel.overwritePermissions([
          {
            id: role,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
          },
        ]);
      }
    }
    channel.overwritePermissions([
      {
        id: user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
      },
    ]);
    await ticketUserSchema.findOneAndUpdate(
      {
        userId: user.id,
        serverId: guild.id,
      },
      {
        userId: user.id,
        serverId: guild.id,
        ticket: true,
        ticketChannel: channel,
      },
      {
        upsert: true,
      }
    );
    const { prefix } = await GuildSettings.findOne({ serverId: guild.id });
    const embed = new MessageEmbed()
      .setTitle(`**Ticket ${user.username}**`)
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
      `Je hebt met succes een ticket aangemaakt! Klik op ${channel} om uw ticket te bekijken.`
    );
    channel.send({ embeds: [embed], components: [row] });
  },
};
