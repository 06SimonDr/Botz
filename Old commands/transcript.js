const ticketSchema = require("../../schemas/ticket-user-schema")
const discord = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = {
	category: 'ticket',
	description: 'Krijg een ticket transcript.',
    callback: async ({message, args, client}) => {

		var result = await ticketSchema.findOne({ticketChannel: message.channel.id})
		if (result === null) {
			var result = await ticketSchema.findOne({closedTickets: message.channel.id})
			if (result === null) return message.reply("Je moet in een ticket zitten om dit command te kunnen uitvoeren.")
		}
		const { _id } = result
		var idList = _id.split("|")

		var member = message.guild.members.cache.get(idList[0])

		if(!message.member.hasPermission('MANAGE_CHANNELS')) if(message.author.id !== member.id) return message.reply("Je hebt geen perms om een transcript aan te vragen.")
        
					
		let messageCollection = new discord.Collection();
        let channelMessages = await message.channel.messages.fetch({
            limit: 100
        }).catch(err => console.log(err));

        messageCollection = messageCollection.concat(channelMessages);

        while(channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if(channelMessages)
                messageCollection = messageCollection.concat(channelMessages);
        }
        let msgs = messageCollection.array().reverse();
        let data = await fs.readFile('./template.html', 'utf8').catch(err => console.log(err));
        if(data) {
            await fs.writeFile(`${message.channel.name}.html`, data).catch(err => console.log(err));
            let guildElement = document.createElement('div');
            let guildText = document.createTextNode(message.guild.name);
            let guildImg = document.createElement('img');
            guildImg.setAttribute('src', message.guild.iconURL());
            guildImg.setAttribute('width', '150');
            guildElement.appendChild(guildImg);
            guildElement.appendChild(guildText);
            await fs.appendFile(`${message.channel.name}.html`, guildElement.outerHTML).catch(err => console.log(err));

            msgs.forEach(async msg => {
                let parentContainer = document.createElement("div");
                parentContainer.className = "parent-container";

                let avatarDiv = document.createElement("div");
                avatarDiv.className = "avatar-container";
                let img = document.createElement('img');
                img.setAttribute('src', msg.author.displayAvatarURL());
                img.className = "avatar";
                avatarDiv.appendChild(img);

                parentContainer.appendChild(avatarDiv);

                let messageContainer = document.createElement('div');
                messageContainer.className = "message-container";

                let nameElement = document.createElement("span");
                let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                nameElement.appendChild(name);
                messageContainer.append(nameElement);

                if(msg.content.startsWith("```")) {
                    let m = msg.content.replace(/```/g, "");
                    let codeNode = document.createElement("code");
                    let textNode =  document.createTextNode(m);
                    codeNode.appendChild(textNode);
                    messageContainer.appendChild(codeNode);
                }
                else {
                    let msgNode = document.createElement('span');
                    let textNode = document.createTextNode(msg.content);
                    msgNode.append(textNode);
                    messageContainer.appendChild(msgNode);
                }
                parentContainer.appendChild(messageContainer);
                await fs.appendFile(`${message.channel.name}.html`, parentContainer.outerHTML).catch(err => console.log(err));
            });
		}

					
				const embed = new discord.MessageEmbed()
				.setTitle("Transcript || Ticket")
				.setDescription(`Transcript aangevraagd door ${message.author}.`)
				.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V8hwYUsC8w')
				.addField('Ticket transcript', 'Hieronder kunt u het ticket transcript vinden.')
				.setColor('#4fc5f7')
				.setFooter("Botz 2021")
				.setTimestamp();
			message.channel.send(embed)
			await message.channel.send({ files: [`./${message.channel.name}.html`] });
			fs.unlink(`./${message.channel.name}.html`)
	},
};