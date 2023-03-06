const ticketSchema = require("../../schemas/ticket-user-schema");
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Permissions,
  Collection,
} = require("discord.js");
const fs = require("fs").promises;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = {
  event: "interaction",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const { message, user } = interaction;
    const { guild } = message;

    if (interaction.customID !== "closeTicket") return;

    const result = await ticketSchema.findOne({
      serverId: interaction.guild.id,
      ticketChannel: interaction.channel.id,
    });
    if (result === null)
      return interaction.reply({
        content: "Dit ticket is al gesloten!",
        ephemeral: true,
      });
    const { userId } = result;
    var member = interaction.guild.members.cache.get(userId);

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      if (interaction.user.id !== member.id)
        return interaction.reply({
          content: "Je hebt geen perms om dit ticket te sluiten.",
          ephemeral: true,
        });

    let messageCollection = new Collection();
    let channelMessages = await interaction.channel.messages
      .fetch({
        limit: 100,
      })
      .catch((err) => console.log(err));

    messageCollection = messageCollection.concat(channelMessages);

    while (channelMessages.size === 100) {
      let lastMessageId = channelMessages.lastKey();
      channelMessages = await interaction.channel.messages
        .fetch({ limit: 100, before: lastMessageId })
        .catch((err) => console.log(err));
      if (channelMessages)
        messageCollection = messageCollection.concat(channelMessages);
    }
    let msgs = messageCollection.array().reverse();
    let data = await fs
      .readFile("./template.html", "utf8")
      .catch((err) => console.log(err));
    if (data) {
      await fs
        .writeFile(`${interaction.channel.name}.html`, data)
        .catch((err) => console.log(err));
      let guildElement = document.createElement("div");
      let guildText = document.createTextNode(interaction.guild.name);
      let guildImg = document.createElement("img");
      guildImg.setAttribute("src", interaction.guild.iconURL());
      guildImg.setAttribute("width", "150");
      guildElement.appendChild(guildImg);
      guildElement.appendChild(guildText);
      await fs
        .appendFile(`${interaction.channel.name}.html`, guildElement.outerHTML)
        .catch((err) => console.log(err));

      msgs.forEach(async (msg) => {
        let parentContainer = document.createElement("div");
        parentContainer.className = "parent-container";

        let avatarDiv = document.createElement("div");
        avatarDiv.className = "avatar-container";
        let img = document.createElement("img");
        img.setAttribute("src", msg.author.displayAvatarURL());
        img.className = "avatar";
        avatarDiv.appendChild(img);

        parentContainer.appendChild(avatarDiv);

        let messageContainer = document.createElement("div");
        messageContainer.className = "message-container";

        let nameElement = document.createElement("span");
        let name = document.createTextNode(
          msg.author.tag +
            " " +
            msg.createdAt.toDateString() +
            " " +
            msg.createdAt.toLocaleTimeString() +
            " EST"
        );
        nameElement.appendChild(name);
        messageContainer.append(nameElement);

        if (msg.content.startsWith("```")) {
          let m = msg.content.replace(/```/g, "");
          let codeNode = document.createElement("code");
          let textNode = document.createTextNode(m);
          codeNode.appendChild(textNode);
          messageContainer.appendChild(codeNode);
        } else {
          let msgNode = document.createElement("span");
          let textNode = document.createTextNode(msg.content);
          msgNode.append(textNode);
          messageContainer.appendChild(msgNode);
        }
        parentContainer.appendChild(messageContainer);
        await fs
          .appendFile(
            `${interaction.channel.name}.html`,
            parentContainer.outerHTML
          )
          .catch((err) => console.log(err));
      });
    }

    const embed = new MessageEmbed()
      .setTitle("Gesloten || Ticket")
      .setDescription(`Jouw ticket is gesloten bij ${interaction.user}.`)
      .setAuthor(
        "Botz",
        "https://i.imgur.com/IdkMnVj.png",
        "https://discord.gg/V8hwYUsC8w"
      )
      .addField(
        "Ticket transcript",
        "Hieronder kunt u het ticket transcript vinden."
      )
      .setColor("#4fc5f7")
      .setFooter("Botz 2021")
      .setTimestamp();
    await member.send({
      embeds: [embed],
      files: [`./${interaction.channel.name}.html`],
    });
    await fs.unlink(`./${interaction.channel.name}.html`);

    try {
      interaction.channel
        .updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          ATTACH_FILES: false,
          READ_MESSAGE_HISTORY: false,
        })
        .then(() => {
          const embed2 = new MessageEmbed()
            .setTitle("Gesloten || Ticket")
            .setDescription(`Dit ticket is gesloten bij ${interaction.user}.`)
            .setAuthor(
              "Botz",
              "https://i.imgur.com/IdkMnVj.png",
              "https://discord.gg/V8hwYUsC8w"
            )
            .addField("Opties", "🔓 - Heropen\n📒 - Transcript\n⛔ - Delete")
            .setColor("#4fc5f7")
            .setFooter("Botz 2021")
            .setTimestamp();
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomID("reopenTicket")
              .setStyle("SUCCESS")
              .setEmoji("🔓"),
            new MessageButton()
              .setCustomID("transcriptTicket")
              .setStyle("PRIMARY")
              .setEmoji("📒"),
            new MessageButton()
              .setCustomID("deleteTicket")
              .setStyle("DANGER")
              .setEmoji("⛔")
          );
          interaction.reply({ embeds: [embed2], components: [row] });
        });
      await ticketSchema.findOneAndUpdate(
        {
          serverId: message.guild.id,
          userId: member.id,
        },
        {
          serverId: message.guild.id,
          userId: member.id,
          ticket: false,
          ticketChannel: "null",
          $push: {
            closedTickets: message.channel.id,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (e) {
      return interaction.reply({
        content: "Er is een fout opgetreden, probeer het opnieuw!",
        ephemeral: true,
      });
    }
  },
};
