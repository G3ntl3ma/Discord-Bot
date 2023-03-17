module.exports = {
    name : 'ping',
    description : 'This is a ping command!',
    permissions : [],
    execute(client, Discord, message, args){
        message.channel.send('pong!');
        
        
    }
}