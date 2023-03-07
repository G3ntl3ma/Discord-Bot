module.exports = {
    name : 'leave',
    description : 'stops the bot from playing',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply('You need to be in a voice Channel to stop the music!');
        await voiceChannel.leave();
        await message.channel.send('Leaving the Voice Channel now ...')
    }
}