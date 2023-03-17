module.exports = {
    name : 'permissions',
    permissions : [],
    description : 'check for all permissions',
    execute(client, Discord, message, args) {
        message.channel.send('The Member has following Permissions:')
        const perms = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR',
         'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 
         'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM',
          'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES',
           'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES',
            'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
             'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK',
              'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS',
               'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                'MANAGE_ROLES', 'MANAGE_WEBHOOKS']
        

           /*for(var i = 0; i< perms.length; i++){
                if(message.member.permissions.has(perms[i])){
                    message.channel.send(perms[i])
                }
            }*/
            perms.forEach(element =>{
            if(message.member.permissions.has(element)){
                message.channel.send(element)
            }   
        })
        
    }
}