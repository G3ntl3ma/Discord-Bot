const profileModel = require('../models/profileSchema')

module.exports = {
    name : 'give',
    description : 'admin gives a peasant some coins',
    aliases : [],
    permissions : ['ADMINISTRATOR'],
    async execute(client, discord, message, args, cmd, profile){
        if(args.length != 2) return message.reply('You need to specify the user and the amount!');
        const amount = args[1];
        const target = message.mentions.users.first();
        if(!target) return message.reply('This user does not exist');

        if(amount % 1 != 0 || amount <= 0) return message.channel.send('You cannot deposit this amount of coins!');

        try{
            const targetData = await profileModel.findOne({userID : target.id});
            if(!targetData) return message.reply('This user does not exist');

            await profileModel.findOneAndUpdate({userID : target.id}, {$inc : { coins : amount}});
            return message.reply('The user has been successfully given coins')
        }catch(err){
            console.log(err)
        }
    },
}