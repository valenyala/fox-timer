const fileManager = require("./fileManager");
const {Client, Intents} = require('discord.js');
require("dotenv").config();

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.commands = fileManager.getCommandsAsCollection("./commands");
client.once("ready", () => {
    console.log("Conectado!");
    console.log(client.application);
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()){
        return;
    }

    const command = client.commands.get(interaction.commandName);
    if(!command){
        return;
    }
    
    try{
        await command.execute(interaction);
    }catch(error){
        console.log(error);
        await interaction.reply({
            content: "An error ocurred while excecuting this command",
            ephemeral: true
        });
    }
})
client.login(process.env.TOKEN);
