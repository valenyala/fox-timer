const { Collection } = require("discord.js");
const fileSystem = require("fs");

function getFiles(path){
    return fileSystem.readdirSync(path).filter(file => file.endsWith(".js"));
}
function getCommandsAsCollection(path){
    const commands = new Collection();
    const commandFiles = getFiles(path);

    for(var file of commandFiles){
        const command = require(path + "\/" + file);
        commands.set(command.data.name, command);
    }
    return commands;
}

function getCommandsToJSON(path){
    const commands = [];
    const commandFiles = getFiles(path);
    
    for(var file of commandFiles){
        const command = require(path + "\/" + file);
        commands.push(command.data.toJSON());
    }
    return commands;
}

module.exports = {getCommandsAsCollection, getCommandsToJSON};