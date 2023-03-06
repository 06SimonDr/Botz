const ticketSchema = require("../../schemas/ticket-user-schema");
const { Permissions } = require('discord.js')

module.exports = {
  event: "interaction",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const { message, user, channel } = interaction;
    const { guild } = message;

    if (interaction.customID !== "deleteTicket") return;

    var result = await ticketSchema.findOne({
      closedTickets: { $in: [channel.id] }
    });
    if (result === null)
      return interaction.reply(
        { content: "Je moet in een gesloten ticket zitten om dit command te kunnen uitvoeren.", ephemeral: true }
      );

    const { userId } = result;

    var member = message.guild.members.cache.get(userId);
    const authorPerms = channel.permissionsFor(interaction.user);
    if (!authorPerms.has(Permissions.FLAGS.MANAGE_CHANNELS))
    return interaction.reply({ content: "Je hebt geen perms om dit ticket te sluiten.", ephemeral: true });

    await ticketSchema.findOneAndUpdate(
      {
        userId: member.id,
        serverId: guild.id
      },
      {
        userId: member.id,
        serverId: guild.id,
        $pull: {
          closedTickets: message.channel.id,
        },
      },
      {
        upsert: true,
      }
    );
    message.channel.delete();
    user.send(`Je hebt het ticket van ${member.user.username} verwijderd!`)
  },
};
