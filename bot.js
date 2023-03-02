/**
 * wikibot.js: Discord bot, that gets infromation from Wikipedia and sends it into the Discord channel.
 */

//setting up discord.js
const Discord = require('discord.js');
const client = new Discord.Client({intents:[
       Discord.Intents.ALL
]});
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connect = 'mongodb+srv://G3ntl3ma:GOfNcqVEGquKc8Y1@discordbot.z8dspps.mongodb.net/?retryWrites=true&w=majority';

const prefix = '!';

//gets all the commands out of the commands folder
const wiki = require('./commands/wiki');
const ping = require('./commands/ping');
const short = require('./commands/short');
const permissions = require('./commands/permissions')
const hangman = require('./commands/hangman');
const command = require('./commands/embeds')
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

//Sends a message if the bot is online
client.once('ready', () =>{
    console.log('The Bot is online!')
})





//all commands are handled here
client.on('message', message =>{
    //preparing the user message to use for commands
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.map(value => value.toLowerCase()) 
    


    if(command[0] === 'ping'){
        /**
     * command !ping: used for confirmation the bot works properly.
     * Sends a 'pong!' message into the channel 
     */
       client.commands.get('ping').execute(message, args)

    } 
   
    else if(command[0] ==='wiki'){
        const order = command.slice(1).map(word => word[0].toUpperCase() + word.substring(1)).join('_')
        client.commands.get('wiki').execute(message, order)
        }
    else if(command[0] === 'short'){
        client.commands.get('short').execute(message, command[1])
        }
    else if(command[0] === 'permissions'){
        client.commands.get('permissions').execute(message);
    }
    else if(command[0] === 'hangman'){
        client.commands.get('hangman').execute(message, client);
    }
    else if(command[0] === 'command'){
        client.commands.get('command').execute(message, args, Discord);
    }
})




//login information. dont tell anyone
client.login(secrets.DISCORD_PASS);
