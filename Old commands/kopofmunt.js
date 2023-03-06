module.exports = {
    category: 'games',
	description: 'Speel kop of munt.',
    callback: ({message, args}) => {

var value = ["kop", "munt"];
    
var result = value[Math.floor(Math.random() * value.length)];
    
message.channel.send(`ik had **${result}** in mijn gedachten`);
    
}
}