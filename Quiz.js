class Quiz {
  constructor(){
    this.result = createElement('h1');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    background("orange");
    Question.hide();

    Contestant.getContestantInfo();
    if(allContestants !== undefined){
      
      question.title.hide();
      fill(64, 224, 208);
      this.result.html("Quiz Result");
      this.result.position(350, 0);
      
      textSize(20);
      text("Note: Contestants who gave the Correct Answer are in Green", 130, 230);
      for (var ans in allContestants){
        var correct = "2";
        if (correct = allContestants[ans].answer)
          fill(98, 247, 0);
        else
        fill(230, 25, 32);
      }
    }
    
  }

}
