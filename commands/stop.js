const {SlashCommandBuilder} = require("@discordjs/builders");
const {Container} = require("../domain/Container");

module.exports = {
    data: new SlashCommandBuilder().setName("stop").setDescription("Stop the timer of this channel"),
    async execute(interaction){
        var deleted = Container.removePomodoro(interaction.channelId);
        if(deleted){
            await interaction.reply("Glad to work with you! ByeBye!");
        }else{
            await interaction.reply("There's not an active Pomodoro session!!!");
        }
    }
}