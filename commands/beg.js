const profileModel = require('../models/profileSchema')
module.exports = {
    name : 'beg',
    aliases : [],
    permissions : [],
    description : 'get some money',
    async execute(discord, client, message, args, cmd, profile){
        const random = Math.floor(Math.random() * 500) +1;
        const response = await profileModel.findOneAndUpdate({
            userID : message.author.id,

        }, {
            $inc: {
                coins : random
            }
        });

        return message.reply(`${random} coins have been added to your account`);
    }
}