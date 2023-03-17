module.exports = {
    name : 'balance',
    aliases : ['bal', 'bil'],
    permissions : [],
    description : 'get the balance of your coins',
    execute(client, Discord, message, args, cmd, profile){
        message.channel.send(`Your wallet balance is : ${profile.coins}, your Bank Balance is: ${profile.bank}`)
    }
}