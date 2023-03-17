const profileModel = require('../models/profileSchema')

module.exports = {
    name : 'deposit',
    aliases : ['dep'],
    permissions : [],
    description : 'Desposit coins in the bank',
    async execute(client, Discord, message, args, cmd, profile){
        const amount = args[0]
        if(amount % 1 != 0 || amount <= 0) return message.channel.send('You cannot deposit this amount of coins!');
        try{
                if(amount > profile.coins) return message.reply('You dont have enough coins');
                await profileModel.findOneAndUpdate({
                    userID : message.author.id
                },{
                    $inc : {
                        coins : -amount,
                        bank : amount
                    }
                }
                )
            return message.channel.send('Your coins have been succesfully deposited');
        }catch(err){
            console.log(err)
        }
    }
}