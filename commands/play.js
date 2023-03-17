const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { validateURL } = require('ytdl-core');

const queue = new Map();
//queue(message.guild.id, queue object{voicechannel, textchannel, connection, song[]});
module.exports = {
    name : 'play',
    description : 'plays music',
    permissions : [],
    aliases : ['skip', 'stop'],
    cooldown : 0,
    async execute(client, Discord, message, args, cmd){
        
        //check if the user is in a voicechannel
        const voicechannel = message.member.voice.channel;
        if(!voicechannel) return message.reply('You need to be in a voice channel to play music')

        //check for correct permissions to use the bot
        const permissions = voicechannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.reply('You dont have the correct permissions');
        if(!permissions.has('SPEAK')) return message.reply('You dont have the correct permissions');
        
        //get the queue for the server
        const server_queue = queue.get(message.guild.id);

        //play the next song in the queue if the command is play    
        if(cmd === 'play'){
            if(!args.length) message.reply('You need to send the correct argument');
            let song = {}

            //if url is passed, get the video from url, else find the first result of the keywords
            if(ytdl-validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = {title : song_info.videoDetails.title, url : song_info.videoDetails.video_url};
            } else {
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return videoResult.videos.length >= 1 ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));

                //if a video exists, give its information to the song object
                if(video){
                    song = {title : video.title, url : video.url}
                } else {
                    message.reply('The video could not be found');
                }
            }
        //creates a queue for the server if one doesnt exist
        if(!server_queue){
            const queue_constructor = {
                voice_channel : voicechannel,
                text_channel : message.channel,
                connection : null,
                songs : []
            }
            queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);

            //try to enter the voice channel
            try {
                const connection = await voicechannel.join();
                queue_constructor.connection = connection;
                video_player(message.guild, queue_constructor.songs[0]);
            } catch (err){
                queue.delete(message.guild.id);
                message.channel.send('There was an Error connecting to the Voicechannel !');
                throw(err);
            }
        }
        else {
            //add the song to the queue
            server_queue.songs.push(song)
            return message.channel.send(`The Song  ***${song.title}*** has been added tp the queue! ✔️`)
        }
        }
        
        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);

    }
}

//function that plays the songs
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //if there is no song available delete the queue
    if(!song){
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {filter : 'audioonly'});
    song_queue.connection.play(stream, {seek : 0, volume : 1})
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`Now playing: ${song.title}`)
}

//Function for skipping the song
const skip_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.reply('You cant skip a song without being in a voicechannel');
    if(!server_queue) return message.reply('There are no Songs in Queue!')
    server_queue.connection.dispatcher.end();
}

//Function for stopping the music
const stop_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.reply('You cannot stop the music if you are not in a voicechannel!')
    server_queue.songs = []
    server_queue.connection.dispatcher.end();
}