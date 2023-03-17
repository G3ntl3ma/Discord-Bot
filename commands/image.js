var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer : {
        headless : true
    }
})
module.exports = {
    name: 'image',
    permissions : [],
    description : 'Finds the best result from google images',
    async execute(client, Discord, message, args){
        const image_query = args.join(' ');
        if(!image_query) return message.reply('please enter an image name');

        const image_results = await google.scrape(image, 1);

        message.channel.send(image_results[0].url)
    }
}