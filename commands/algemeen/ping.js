module.exports = {
  name: 'ping',
  description: 'Bekijk de ping van de bot.',
  category: 'informatie',
  execute(client, message, args, prefix) {
      message.channel.send("Bot latency: " + (Date.now() - message.createdTimestamp) + "ms, API latency: " + client.ws.ping +"ms.");
  }
}