module.exports = {
    name : 'clear',
    description : 'clear as many messages as the specified amount',
     async execute(message, args){
        //handling bad inputs
        if(!args[1]) return message.reply('please enter the amount of messages that you want to have cleared');
        if(isNaN(args[1]))return message.reply('Please enter a number')
        if(args[1] > 100) return message.reply('You cant clear more than 100 messages at a time')
        if(args[1] < 1) return message.reply('The number must be at least 1!');

            await message.channel.messages.fetch({limit: args[1]}).then(messages => {
                message.channel.bulkDelete(messages)
            });
    }
}