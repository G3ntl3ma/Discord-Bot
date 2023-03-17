const util = require('minecraft-server-util');

module.exports = {
    name : 'mcserver',
    permissions : [],
    description : 'get information about a minecraft server',
    execute(client, discord, message, args){
        if(!args[0]||!args[1]) return message.reply('You need to send the correct arguments')

        util.status(args[0]).then(response => {
            const embed = new discord.MessageEmbed()
            .setColor('#016c9a')
            .setTitle('Mc Server Status')
            .addFields(
                {name : 'Server IP:', value : args[0]},
                {name : 'Online Players', value : response.players.online},
                {name : 'Max Players', value : response.players.max},
                {name : 'Version', value : response.version.name}
            )
            .setFooter('MC Server by me');
            message.channel.send(embed);
        })
        .catch(error => {
            message.reply('An Error ocurred, the server could not be found')
            throw error
        })
    }
}