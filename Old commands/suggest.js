const { MessageEmbed } = require("discord.js");
const suggestieSchema = require("../schemas/suggestie-schema")
 
module.exports = {
  category: 'suggestie',
	description: 'Maak een suggestie aan.',
    callback: async ({message, args}) => {
      const {guild} = message

      const result = await suggestieSchema.findById(guild.id)
      if(result === null) return
      var {channelId} = result
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Gelieve een suggestie mee te geven!");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setTitle("Suggestie")
       .setDescription(`${suggestionQuery}`)
       .setColor("#4fc5f7")
       .setFooter("© Botz 2021")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setTitle("Suggestie verzonden")
       .setDescription(`✅ | Je suggestie is verzonden, <#${channelId}>.`)
       .setColor("#4fc5f7")
       .setFooter("© Botz 2021")
    	 .setTimestamp();
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channelId).send(embed)
    
    await msgEmbed.react('✅')
    await msgEmbed.react('❌')
  }
}