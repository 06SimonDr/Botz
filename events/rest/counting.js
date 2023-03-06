const countSchema = require("../../schemas/count-schema")

module.exports = {
    event: 'message',
	async execute(message, client) {
      
      const guild = message.guild
      if (!guild) return
      const result = await countSchema.findById(guild.id)
      if(result === null) return
      var { channelId, nummer, lastUser } = result

      if(isNaN(message.content)) return
      if(message.channel.id !== channelId) return
      if(!message.guild.channels.cache.get(channelId)) return
      if(guild.id === "755427002390937731") if(parseInt(message.content) === 69) message.channel.send('Max is geil')
      if(parseInt(message.content) === nummer+1 && lastUser !== message.author.id) {
          await countSchema.findOneAndUpdate(
              {
                  _id: guild.id
              },
              {
                  _id: guild.id,
                  nummer: parseInt(message.content),
                  lastUser: message.author.id
              },
              {
                  upsert: true
              }
          )
          message.react("✅");
      } 
      else if (lastUser === message.author.id) {
          message.react('❌');
          await countSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                nummer: 0,
                lastUser: "."
            },
            {
                upsert: true
            }
        )
          message.reply('Fout de vorige cijfer had je al opgenoemd. We beginnen bij **1**.');
      } 
      else {
        message.react('❌');
        await countSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                nummer: 0,
                lastUser: "."
            },
            {
                upsert: true
            }
        )
        message.reply(`Verknoeid bij ${nummer}, we beginnen weer bij **1**.`);
}
},
}