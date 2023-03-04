module.exports = {
    name : 'ban',
    description : 'Ban a person',
    execute(message, args){
        const members = message.mentions.users;
        if(members){
            members.forEach(member => {
                const m = message.guild.members.cache.get(member.id)
                m.ban()
                message.channel.send('The user ' + member.toString() + ' has been banned')})
        } else {
            message.channel.send('You cannot ban this member');
        }
    }
}
