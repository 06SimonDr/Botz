const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "test",
  description: "TEST COMMAND",
  async execute(client, interaction, args) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomID("select")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Select me",
            description: "This is a description",
            value: "first_option",
          },
          {
            label: "You can select me too",
            description: "This is also a description",
            value: "second_option",
          },
        ])
    );

    await interaction.reply({ content: "Pong!" });
  },
};
