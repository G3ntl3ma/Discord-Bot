module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message',
    async execute(message, args, Discord, client) {
        const channel = '1081662156606550128';
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === 'Team Yellow');
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === 'Team Blue');

        const blueTeamEmoji = '💙'
        const yellowTeamEmoji = '💛'

        let embed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('Choose a Team to play on!')
        .setDescription('Choosing a team will allow you to interact with your teammates\n\n'
            + `${yellowTeamEmoji} for the yellow Team\n`
            + `${blueTeamEmoji} for the blue Team`);

        
        let messageEmbed = await message.channel.send(embed);
        await messageEmbed.react(blueTeamEmoji);
        await messageEmbed.react(yellowTeamEmoji);

        client.on('messageReactionAdd', async (reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id === channel){
                if(reaction.emoji.name === yellowTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }
                if(reaction.emoji.name === blueTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
                }
                else return;
            }
            else return;
        })

        client.on('messageReactionRemove', async (reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id === channel){
                if(reaction.emoji.name === yellowTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }
                if(reaction.emoji.name === blueTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                }
                else return;
            }
            else return;
        })
    }
}