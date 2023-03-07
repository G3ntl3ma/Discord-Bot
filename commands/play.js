const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports =  { 
    name : 'play',
    description: 'joins and plays a video from youtube',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply('You cannot play music when not in a voicechannel');
        const permission = voiceChannel.permissionsFor(message.client.user);
        if(!permission.has('CONNECT')) return message.reply('You cannot use the bot');
        if(!permission.has('SPEAK')) return message.reply('You cannot use the bot');
        if(args.length === 1) return message.channel.reply('You need to send the song title!');
        
        //looking for a correct url and playing the song, when it has been found   
        const validURL = str => {
            var regex = /(http|https):\/\/(\w+:{0, 1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

            return regex.test(str)
        }

        if(validURL(args[1])){

            const connection = await voiceChannel.join();
            const stream = ytdl(args[1], {filter : 'audioonly'})
            connection.play(stream, {seek: 0, volume : 1})
            .on('finish', () => voiceChannel.leave());
            await message.channel.send('👍 Now Playing the Video');
            return
        }

        const connection = await voiceChannel.join();
        const videoFinder = async query => {
            const videoResult = await ytSearch(query);
            
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        
        const video = await videoFinder(args.slice(1).join(' '));
        if(video){
            const stream = ytdl(video.url, {filter : 'audioonly'})
            connection.play(stream, {seek: 0, volume : 1})
            .on('finish', () => voiceChannel.leave());
            await message.channel.send('👍 Now Playing : ' + video.title);
        } else message.channel.send('No video was found');
    }
}