module.exports = {
    name : 'kick',
    description : 'kicks a person',
    execute(message, args){
        const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id)
            memberTarget.kick();
            message.channel.send('The user ' + member + ' has been kicked')
        } else {
            message.channel.send('You cannot kick this member');
        }
    }
}
