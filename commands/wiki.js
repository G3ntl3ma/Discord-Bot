const pup = require('puppeteer');
const expressWs = require('express-ws');
const express = require('express');
const app = express();
const fs = require('fs')

module.exports = {

    
    name : 'wiki',
    description : 'Searches on wikipedia for the topic and sends a message with a screenshot of the searched topic. If nothing is found the Screenshot will say the page doesnt exist',
    execute(message, command){
         /**
     * command !wiki {keyword}: searches for keyword on wikipedia and sends a screenshot of the page into the channel.
     * Sends a Screenshot with 'this page doesnt exist' if the wikipedia page cant be found 
     */
         
            if(message.member.roles.cache.some(r => r.name ==="God")){
          
         (async () =>{
            const browser = await pup.launch();
            const page = await browser.newPage();
    
            await page.goto('https://de.wikipedia.org/wiki/!'.replace('!',command),{
            waitUntil: 'networkidle2'
            });
            await page.screenshot({path: './commands/'+command+'.png'})
            await message.channel.send({files : ['./commands/'+command+'.png']})
            await browser.close()
            await fs.unlink('./commands/'+command+".png", (err)=>{
                if(err){
                    throw err;
                }
                message.channel.send('You can use the command now, but not next time ;)')
                message.member.roles.remove('1065006371453554729')
            })
        })();
    }else{
            message.channel.send('You are not allowed to use this command, but next time you can!');
            message.member.roles.add('1065006371453554729');
    }
}
}