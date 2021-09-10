const {join} = require("path");
const { createReadStream } = require('fs');
const {SlashCommandBuilder} = require("@discordjs/builders");
const {joinVoiceChannel, 
        createAudioPlayer,
        entersState,
        StreamType,
        AudioPlayerStatus,
        VoiceConnectionStatus,
        createAudioResource
        } = require("@discordjs/voice");
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
       /*
        const channel = interaction.member.voice.channel;
        if(channel){
            const player = createAudioPlayer();
            const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
	        	inputType: StreamType.Arbitrary,
	        });
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            })
                connection.subscribe(player);
            player.play(resource);
                interaction.reply("Funciono!!!!");
        }else{
            interaction.reply("No funciono :(" );
        }
        */
    }
}