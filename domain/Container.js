class Container {
  constructor() {
    this.pomodoros = [];
  }

  static instance;

  static getInstance(){
    if(!Container.instance){
      Container.instance = new Container();
    }
    return Container.instance;
  }

  static addPomodoro(pomodoro) {
    Container.getInstance().pomodoros.push(pomodoro);
  }

  static removePomodoro(id) {
    var pomodoros = Container.getInstance().pomodoros;
    var removed = false;
    for(var i = 0; i < pomodoros.length && !removed; i++){
      if(pomodoros[i].id === id){
        pomodoros[i].stopTimer();
        Container.getInstance().pomodoros.splice(i, 1);
        removed = true;
      }
    }
    return removed;
  }

  static hasPomodoro(id){
    var container = Container.getInstance();
    for(var pomodoro of container.pomodoros){
      if(pomodoro.id === id){
        return true;
      }
    }
    return false;
  }
}

module.exports = {Container};