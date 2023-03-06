module.exports = {
    name: 'ping',
    description: 'Bekijk de ping van de bot.',
    execute(client, interaction, args) {
        interaction.reply("Bot latency: " + (Date.now() - interaction.createdTimestamp) + "ms, API latency: " + client.ws.ping +"ms.");
    }
  }