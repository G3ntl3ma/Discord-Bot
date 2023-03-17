const memberCounter = require("../../counters/member-counter");

module.exports = (client, Discord) => {
    console.log('The Bot is online!')
    memberCounter(client);
};