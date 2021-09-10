const timeConverter = require("../utils/timerConverter");
class Pomodoro{
    static RUNNING = 0;
    static SHORT_BREAK = 1;
    static LONG_BREAK = 2;
    constructor(id, workTime, shortBreak, longBreak, interaction){
        this.id = id;
        this.workTime = workTime;
        this.shortBreak = shortBreak;
        this.longBreak = longBreak;
        this.interaction= interaction;
        this.startedTime = new Date();
        this.timerId = null;
        this.messageToSend = null;
        this.status = null;
        this.shortBreakCount = 0;
        this.longBreakCount = 0;
        this.interval = 0;
        
        this.startNewCycle();
    }

    startNewCycle(){
        this.changeStatus();
        this.changeMessageToSend();
        this.changeInterval();

        this.timerId = setTimeout( () => {
            this.sendMessage(this.messageToSend);

            this.startNewCycle();
        }, this.interval);

    }

    sendMessage(message){
        this.interaction.channel.send(message);
    }

    changeStatus(){
        if(this.status === null){
            this.status = Pomodoro.RUNNING;
        }else if(this.status === Pomodoro.RUNNING){
            if(this.shortBreakCount >= 3){
                this.status = Pomodoro.LONG_BREAK;
            }else{
                this.status = Pomodoro.SHORT_BREAK;
            }
        }else if(this.status === Pomodoro.SHORT_BREAK){
            this.status = Pomodoro.RUNNING;
            this.shortBreakCount++;
        }else if(this.status === Pomodoro.LONG_BREAK){
            this.status = Pomodoro.RUNNING;
            this.shortBreakCount = 0;
        }
        console.log(this.status);
    }

    changeMessageToSend(){
        if(this.status === Pomodoro.RUNNING){
            if(this.shortBreakCount >= 3){
                this.messageToSend = "Long break time!";
            }else{
                this.messageToSend = "Short break time!";
            }
        }else if(this.status === Pomodoro.SHORT_BREAK){
            this.messageToSend = "Short Break finished! Go back to work!";
        }else if (this.status === Pomodoro.LONG_BREAK){
            this.messageToSend = "Long Break finished! Go back to work!";
        }
    }

    changeInterval(){
        if(this.status === Pomodoro.RUNNING){
            this.interval = timeConverter.minToMs(this.workTime);
        }else if(this.status === Pomodoro.SHORT_BREAK){
            this.interval = timeConverter.minToMs(this.shortBreak);
        }else if(this.status === Pomodoro.LONG_BREAK){
            this.interval = timeConverter.minToMs(this.longBreak);
        }
    }

    stopTimer(){
        if(this.timerId){
            clearTimeout(this.timerId);
            this.interaction.channel.send("Timer stopped!");
        }
    }
}

module.exports = {Pomodoro};