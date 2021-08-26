const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
require("dotenv").config();
const fileManager = require("./fileManager");

const commands = fileManager.getCommandsToJSON("./commands");

const rest = new REST({
    version: "9"
}).setToken(process.env.TOKEN);

(async () => {
    try{
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body : commands},
        );

        console.log("Registered/Reloaded the bot's slash commands");
    }catch(error){
        console.error(error);
    }
})();