const ms = require('ms')

module.exports = {
    name : 'mute',
    permissions : [],
    description : 'mute a member',
    permissions : ['MANAGE_ROLES'],
    execute(client, Discord, message, args){
        
        const members = message.mentions.users;
        if(members){
            //Get the important roles
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
            //loop through each member
            members.forEach(member => {
                const m = message.guild.members.cache.get(member.id)
                m.roles.remove(mainRole.id)
                m.roles.add(muteRole)
                //if a number is attached to the command its only gonna timeout for the specified amount of time, otherwise mute until unmuted
                if(isNaN(args[args.length -1])){
                    message.channel.send('The user ' + member.toString() + ' has been muted')
                   }
                else {
                    setTimeout(function(){
                        m.roles.remove(muteRole.id)
                        m.roles.add(mainRole.id)
                    }, args[args.length -1] * 60000)
                    message.channel.send(`The member ${member.toString()} has been muted for ${args[args.length -1]} minutes`)
                }
        }
        )
            
        } else {
            message.channel.send('You cannot mute this member');
        }
    

    }
    }
