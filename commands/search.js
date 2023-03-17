const profileModel = require('../models/profileSchema')

module.exports = {
    name : 'search',
    aliases : [],
    permissions : [],
    description : 'Get a random amount of coins',
    async  execute(client, discord, message, args, cmd, profile){

        const locations = [
            'car',
            'bathroom',
            'truck',
            'park',
            'pocket'
        ];

        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = ({author, content}) => message.author == author && chosenLocations.some(location => location.toLowerCase() == content.toLowerCase());
        const collector = message.channel.createMessageCollector(filter, {max : 1, time : 25000});

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        collector.on('collect' , async m => {
            message.channel.send(`You found ${earnings} coins!`)
        

        await profileModel.findOneAndUpdate({userID : message.author.id}, {$inc : {coins : earnings}});
        });

        collector.on('end', (collected, reason) => {
            if(reason == 'time'){
                message.channel.send('You ran out of time!')
            }
        })

        message.reply(`What location do you want to search? \n Type the location in this channel\n \`${chosenLocations.join(' ')}\``)
    }
}