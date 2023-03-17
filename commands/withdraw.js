const profileModel = require('../models/profileSchema')

module.exports = {
    name : 'withdraw',
    aliases : [],
    permissions : [],
    description : 'Withdraw coins from the bank',
    async execute(client, Discord, message, args, cmd, profile){
        const amount = args[0]
        if(amount % 1 != 0 || amount <= 0) return message.channel.send('You cannot withdraw this amount of coins!');
        try{
                if(amount > profile.bank) return message.reply('You dont have enough coins  in the Bank');
                await profileModel.findOneAndUpdate({
                    userID : message.author.id
                },{
                    $inc : {
                        coins : amount,
                        bank : -amount
                    }
                }
                )
            return message.channel.send('Your coins have been succesfully withdrawn');
        }catch(err){
            console.log(err)
        }
    }
}