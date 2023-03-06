module.exports = {
	category: 'games',
	description: 'Gooi met een dobbelsteen.',
	callback: ({message}) => {

	var result = Math.ceil(Math.random() * 6);
    
    message.channel.send(` :game_die: Je hebt **${result}** gegooid! :game_die:`);
    }
}