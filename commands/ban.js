module.exports = {
    name : 'ban',
    description : 'Ban a person',
    execute(message, args){
        const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id)
            memberTarget.ban();
            message.channel.send('The user ' + member + ' has been banned')
        } else {
            message.channel.send('You cannot ban this member');
        }
    }
}
