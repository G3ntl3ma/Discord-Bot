module.exports = {
    name : 'embeds',
    cooldown : 300,
    description : 'Create an Embed',
    permissions : [],
    execute(client, Discord, message, args){
        const embed = new Discord.MessageEmbed()
        .setColor('#4db399')
        .setTitle('Rules')
        .setURL('https://youtube.com')
        .addFields({
            name: 'Rule 1:',
            value: 'be nice',
        },
        {
            name: 'Rule 2:',
            value: 'unfunny Jokes are Illegal',
        },
        {
            name: 'Rule 3:',
            value: 'i have Diarrhea',
        })
        .setImage('https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg')
        message.channel.send(embed)
    }
}