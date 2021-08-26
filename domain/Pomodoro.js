const timeConverter = require("../utils/timerConverter");
class Pomodoro{
    static RUNNING = 0;
    static SHORT_BREAK = 1;
    static LONG_BREAK = 2;
    constructor(id, workTime, smallBreak, bigBreak, voiceConnection, interaction){
        this.id = id;
        this.workTime = workTime;
        this.smallBreak = smallBreak;
        this.bigBreak = bigBreak;
        this.voiceConnection = voiceConnection;
        this.interaction= interaction;
        this.startedTime = new Date();
        this.timerId = null;
        this.messageToSend = null;
        this.status = null;
        this.shortBreakCount = 0;
        this.bigBreakCount = 0;
        this.interval = 0;
        
        this.startNewCycle();
    }

    startNewCycle(){
        if(!this.status){//the pomodoro is about to start!
            this.interaction.channel.send("Pomodoro started! Lets work!");
        }
        changeStatus();
        changeMessageToSend();
        changeInterval();

        this.timerId = setTimeout( () => {
            sendMessage(this.messageToSend);

            this.startNewCycle();
        }, this.interval);

    }

    sendMessage(message){
        this.interaction.channel.send(message);
    }

    stopTimer(){
        if(this.timerId){
            clearTimeout(this.timerId);
        }
    }
}