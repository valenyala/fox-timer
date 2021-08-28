const {SlashCommandBuilder} = require("@discordjs/builders");
const {Container} = require("../domain/Container");
const {Pomodoro} = require("../domain/Pomodoro");

module.exports = {
    data: new SlashCommandBuilder().setName("start").setDescription("Start a Pomodoro")
            .addNumberOption(option => option.setName("work_interval")
                                             .setDescription("Your work interval"))
            .addNumberOption(option => option.setName("short_break")
                                             .setDescription("Your short break"))
            .addNumberOption(option => option.setName("long_break")
                                             .setDescription("Your long break")),
    async execute(interaction){
        var channelId = interaction.channelId;
        if(Container.hasPomodoro(channelId)){
            await interaction.reply("There is a text only pomodoro already in this channel!");

        }
        else{
            var id = interaction.channelId;
            var workTime = interaction.options.getNumber("work_interval") || 25;
            var shortBreak = interaction.options.getNumber("short_break") || 5;
            var longBreak = interaction.options.getNumber("long_break") || 15;

            var pomodoro = new Pomodoro(id, workTime, shortBreak, longBreak, interaction);

            Container.addPomodoro(pomodoro);

            interaction.reply("Pomodoro started! Let's work!!!");
        }
    }
}