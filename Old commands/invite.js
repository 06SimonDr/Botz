const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: 'both',
  testOnly: false, // Ensure you have test servers setup
  description: 'Invite de bot in je server!', // Required for slash commands
  category: 'informatie',
  callback: ({message}) => {
    // Destructure the name and age from the args array

    // Create the embed
    const embed = new MessageEmbed()
    .setTitle("**Botz || Invite**")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=853009709190348810&permissions=8&scope=bot%20applications.commands")
    .setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
    .setColor("#4fc5f7")
    .setDescription(" Maak je server beter met Botz!")
    .addField("Botz", "[Klik hier](https://discord.com/api/oauth2/authorize?client_id=853009709190348810&permissions=8&scope=bot%20applications.commands)", true)
    .addField("Botz Canary", "[Klik hier](https://discord.com/api/oauth2/authorize?client_id=853010702192476211&permissions=8&scope=bot)", true)
    .setImage("https://i.imgur.com/IdkMnVj.png")
    .setFooter("© Botz 2021")
    .setTimestamp();

      if (message) {
      return message.channel.send(embed)
    }
    // The content to reply with must be returned from the callback function
    // This is required for slash commands exclusively
    return embed
  },
}