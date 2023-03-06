const ticketSchema = require("../../schemas/ticket-schema");
const discord = require("discord.js");
const { Permissions } = discord;

module.exports = {
  name: "ticketrole",
  description: "Verander de ticket support role",
  args: [
    {
      name: "optie",
      type: "STRING",
      description: "Add of remove",
      required: true,
      choices: [
        {
          name: "Add",
          value: "add",
        },
        {
          name: "Remove",
          value: "remove",
        },
      ],
    },
    {
      name: "rol",
      type: "ROLE",
      description: "Selecteer een rol",
      required: true,
    },
  ],
  permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
  async execute(client, interaction, args) {
    const { guild } = interaction;

    const result = await ticketSchema.findById(guild.id)
    const { supportRole } = result

    if(args[0] === "add") {
        if(supportRole.includes(args[1])) return interaction.reply({ content: 'Deze role is al toegevoegd!', ephemeral: true })
        await ticketSchema.findOneAndUpdate(
            { _id: guild.id },
            { _id: guild.id, $push: { supportRole: args[1] } },
            { upsert: true }
        )
        return interaction.reply(`De role is toegevoegd!`)
    }
    if(args[0] === 'remove') {
        if(!supportRole.includes(args[1])) return interaction.reply({ content: 'Deze role is niet toegevoegd, dus je kunt hem ook niet verwijderen!', ephemeral: true })
        await ticketSchema.findOneAndUpdate(
            { _id: guild.id },
            { _id: guild.id, $pull: { supportRole: args[1] } },
            { upsert: true }
        )
        return interaction.reply(`De role is verwijderd!`)
    }
  },
};
