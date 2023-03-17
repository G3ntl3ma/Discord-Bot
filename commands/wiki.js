const wiki = require('wikipedia-tldr');

module.exports = {
    name : 'wiki',
    aliases : [],
    cooldown : 0,
    permissions : [],
    execute(client, discord, message, args){
        wiki(args.join(' ')).then(result => {
        message.channel.send(result.extract);
        });
    }
}