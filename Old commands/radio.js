const discord = require("discord.js");

module.exports = {
    category: 'radio',
	description: 'Luister naar een radio zender.',
    callback: async ({message, args}) => {
    
    var help = new discord.MessageEmbed()
            .setTitle("Help panel || Lijst")
    		.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
    		.setDescription("`!radio Qmusic` - Speel Qmusic af.\n`!radio Qmusic-Nonstop` - Speel Qmusic-Nonstop af.\n`!radio Skyradio` - Speel Skyradio af.\n`!radio Skyradio-Nonstop` - Speel Skyradio-Nonstop af.\n`!radio Radio538` - Speel Radio538 af.\n`!radio Radio538-Nonstop` - Speel Radio538-Nonstop af.\n`!radio 100%NL` - Speel 100%NL af.\n`!radio 100%NL-Nonstop` - Speel 100%NL-Nonstop af.\n`!radio Slam` - Speel Slam af.\n`!radio Slam-Nonstop` - Speel Slam-Nonstop af.\n`!radio Slam-HardStyle` - Speel Slam-HardStyle af.\n`!radio Veronica` - Speel Veronica af.\n`!radio Veronica-Nonstop` - Speel Veronica-Nonstop af.")
            .setFooter("© Botz 2021")
    		.setTimestamp()
    
    var geenkanaal = new discord.MessageEmbed()
        .setTitle("**⚠️ || Error!**")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription("Connecteer met een spraakkanaal!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
    
    var alverbonden = new discord.MessageEmbed()
        .setTitle("**⚠️ || Error!**")
    	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
        .setColor("#4fc5f7")
        .setDescription("Sorry, de bot is al verbonden!")
    	.setFooter("© Botz 2021")
    	.setTimestamp();
    
    if (!args[0]) return message.reply(help);

    var options = ["radio538", "radio538-nonstop", "skyradio-nonstop", "skyradio", "qmusic", "qmusic-nonstop", "100%nl", "100%nl-nonstop", "slam", "slam-nonstop", "slam-hardstyle", "veronica", "veronica-nonstop"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == ".") {

        

    }
    else if (args[0].toUpperCase() == "SKYRADIO-NONSTOP") {
        
        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://playerservices.streamtheworld.com/api/livestream-redirect/SRGSTR24.mp3', options));

        var playing = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "SkyRadio-NonStop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing);
        
    } else if (args[0].toUpperCase() == "SKYRADIO") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/skyradio/stream/8-mp3-128', options));

        var playing2 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "SkyRadio wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing2);

    } else if (args[0].toUpperCase() == "RADIO538-NONSTOP") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/538-non-stop/stream/52-mp3-128'));

        var playing3 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Radio538-NonStop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing3);

    } else if (args[0].toUpperCase() == "RADIO538") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/radio-538/stream/4-mp3-128', options));

        var playing4 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Radio538 wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing4);

    } else if (args[0].toUpperCase() == "QMUSIC") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/qmusic/stream/20-aac-64', options));

        var playing5 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Qmusic wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing5);
        
        } else if (args[0].toUpperCase() == "QMUSIC-NONSTOP") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/qmusic-non-stop/stream/125-mp3-96', options));

        var playing6 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Qmusic-Nonstop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing6);
            
     	} else if (args[0].toUpperCase() == "100%NL") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/100-nl/stream/15-aac-96', options));

        var playing7 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "100%NL wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing7);
            
     	} else if (args[0].toUpperCase() == "100%NL-NONSTOP") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/100-nl-non-stop/stream/104-aac-96', options));

        var playing8 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "100%NL-Nonstop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing8);
            
     	} else if (args[0].toUpperCase() == "SLAM") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/slam/stream/10-aac-96', options));

        var playing9 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Slam wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing9);
      	
     	} else if (args[0].toUpperCase() == "SLAM-NONSTOP") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/slam-non-stop/stream/94-aac-96', options));

        var playing10 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Slam-Nonstop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing10);
            
      	} else if (args[0].toUpperCase() == "SLAM-HARDSTYLE") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/slam-hardstyle/stream/91-aac-96', options));

        var playing11 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Slam-HardStyle wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing11);
            
      	} else if (args[0].toUpperCase() == "VERONICA") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/veronica/stream/11-mp3-128', options));

        var playing12 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Veronica wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing12);
            
      	} else if (args[0].toUpperCase() == "VERONICA-NONSTOP") {

        if (!message.member.voice.channel) return message.reply(geenkanaal);
        if (message.guild.me.voice.channel) return message.channel.send(alverbonden);
    
        var options = { seek: 2, volume: 1.0, bitrate: 128000 };

        message.member.voice.channel.join().then(connection => connection.play('https://www.mp3streams.nl/zender/veronica-non-stop/stream/71-mp3-128', options));

        var playing13 = new discord.MessageEmbed()
            .setTitle("Botz || Radio")
        	.setAuthor('Botz', 'https://i.imgur.com/IdkMnVj.png', 'https://discord.gg/V9mfyunXcB')
            .setColor("#4fc5f7")
            .addField("Gelukt:", "Veronica-Nonstop wordt afgespeeld.")
            .setFooter("© Botz 2021")
        	.setTimestamp();
            
   
   
        message.channel.send(playing13);

        
    }

}
}