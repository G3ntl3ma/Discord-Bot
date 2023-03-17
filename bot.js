
//setting up discord.js
const Discord = require('discord.js');
const client = new Discord.Client({intents:[
       Discord.Intents.ALL
], partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

//get all dependencies
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const memberCounter = require('./counters/member-counter')
require('dotenv').config();

//gets all the commands out of the commands folder
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})


mongoose.connect(process.env.MONGOPASS).then(() =>
    console.log('connected to the database')
).catch((err) => {
    console.log('Connection failed!')
    console.log(err)
})
//login information. dont tell anyone
client.login(process.env.DISCORD_TOKEN);