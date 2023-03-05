module.exports = async (client) => {
        const guild = client.guilds.cache.get('579292393547759643');
        setInterval(() =>{
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.get('1082057329345822741');
            channel.setName(`Total Members: ${memberCount.toLocaleString()}`)
            console.log('Updating Membercount')
        }, 60000 * 15);
}
