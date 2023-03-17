module.exports = {
    name : 'suggestions',
    aliases : ['suggest', 'suggestion'],
    permissions : [],
    description : 'creates a suggestion',
    execute(client, discord, message, args, cmd){
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if(!channel) return message.reply('A channel with the name suggestions does not exist!');
        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('#61001B')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        .setDescription(messageArgs)

        channel.send(embed).then(msg => {
            msg.react('✔️');
            msg.react('🚫');
            message.delete();
        }).catch((err) => {
            console.log(err)
        })
    }
}