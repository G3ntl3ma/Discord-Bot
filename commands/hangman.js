module.exports = {
    name : 'hangman',
    permissions : [],
    description : 'Starts a game of hangman',
    execute(client, Discord, message, args){
        message.channel.send('Why is it not workin :(');
        message.channel.send('Hello Everything is fine so far');
        var randomWords = require('random-words')
        const word = randomWords({min : 5,max:10})
        var bool = true;
        while(bool){
        message.channel.send('Alright lets play a game :). The word is ' + word.length + ' Letters long');
        client.on('message', mes =>{
            if(mes.channel === message.channel && mes.length === 1){
                mes.channel.send('Hello this Test is working :)')
            }
        })
        }

    }
}