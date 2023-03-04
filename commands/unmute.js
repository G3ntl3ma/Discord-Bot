module.exports = {
    name : 'unmute',
    description : 'unmute a member',
    execute(message, args){
        const members = message.mentions.users;
        if(members){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
            members.forEach(member => {
                const m = message.guild.members.cache.get(member.id)
                m.roles.remove(muteRole.id)
                m.roles.add(mainRole.id)
                message.channel.send('The user ' + member.toString() + ' has been unmuted')})
        } else {
            message.channel.send('You cannot unmute this member');
        }
    }
}