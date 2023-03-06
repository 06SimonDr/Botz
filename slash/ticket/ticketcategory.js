const ticketSchema = require("../../schemas/ticket-schema");
const discord = require("discord.js");
const { Permissions } = discord;

module.exports = {
  name: "ticketcategorie",
  description: "Verander de ticket category",
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
          name: "Delete",
          value: "delete",
        },
      ],
    },
    {
      name: "category",
      type: "CHANNEL",
      description: "Selecteer een categorie",
      required: false,
    },
  ],
  permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
  async execute(client, interaction, args) {
    const { guild } = interaction;

    const result = await ticketSchema.findById(guild.id)
    const { category } = result

    if(args[0] === "add") {
        if(!args[1]) return interaction.reply({ content: 'Je hebt geen categorie gekozen!', ephemeral: true })
        const category = await guild.channels.cache.get(args[1])
        if(category.type !== 'category') return interaction.reply({ content: 'Je hebt geen categorie channel gekozen!', ephemeral: true })
        await ticketSchema.findOneAndUpdate(
            { _id: guild.id },
            { _id: guild.id, category: args[1] },
            { upsert: true }
        )
        return interaction.reply(`De ticket catergorie channel is veranderd naar ${category.name}!`)
    }
    if(args[0] === 'delete') {
      if(!category) return interaction.reply({ content: 'Er is geen ticket categorie geregistreerd!', ephemeral: true })
        await ticketSchema.findOneAndUpdate(
            { _id: guild.id },
            { _id: guild.id, category: null },
            { upsert: true }
        )
        return interaction.reply(`De ticket categorie is verwijderd!`)
    }
  },
};
