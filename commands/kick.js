module.exports = {
    name : 'kick',
    description : 'kicks a person',
    execute(message, args){
        const members = message.mentions.users;
        if(members){
            members.forEach(member => {
                const m = message.guild.members.cache.get(member.id)
                m.kick()
                message.channel.send('The user ' + member.toString() + ' has been kicked')})
        } else {
            message.channel.send('You cannot kick this member');
        }
    }
}
