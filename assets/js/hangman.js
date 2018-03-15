//Start of the application
document.addEventListener('DOMContentLoaded', function () {
  homeScreen();
});

/*::::::DOM CACHE::::::*/
var keyContainer = document.getElementById("keyContainer");
var alreadyTyped = document.getElementById("alreadyTyped");
var scoreBoard = document.getElementById("scoreBoard");
var winBoard = document.getElementById("userWins");
var audioBoard = document.getElementById("sound_controls");
var currentBlock = document.getElementById("currentBlock");
var typedBlock = document.getElementById("typedBlock");
var logo = document.getElementById("logo");
var hangImage = document.getElementById("hangImage");
var leftCont = document.getElementById("left-cont");

/*::::::GLOBALS::::::*/
var gameChances = 10;
var userWins = 0;
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
  "T", "U", "V", "W", "X", "Y", "Z"
];
var hangedNames = ["TRIANGLE", "GUITAR", "SAX", "FLUTE", "VIOLA", "HARP", "CLARINET", "PIANO", "DRUMS"];
var randomNames = hangedNames[Math.floor(Math.random() * hangedNames.length)];
var rightAnswer = [];

console.log(randomNames);

function clearBoard() {
  hangImage.innerHTML = "";
  logo.innerHTML = "";
  currentBlock.innerHTML = "";
  typedBlock.innerHTML = "";
}

function homeScreen() {
  loadLogo();
  var titles = document.createElement("H3");
  titles.classList.add("welcome");
  titles.innerHTML += "Welcome to Hangman: A Musical Journey";
  currentBlock.classList.add("py-3", "mb-4");
  currentBlock.appendChild(titles);

  var playButton = document.createElement("BUTTON");
  playButton.classList.add("startButton", "btn", "btn-primary", "greenBg", "my-3");
  playButton.innerHTML += "Start The Game";
  currentBlock.appendChild(playButton);

  var giphy = document.createElement("DIV");
  giphy.classList.add("py-3");

  giphy.innerHTML += "<iframe src='https://giphy.com/embed/l2JhGk8rR9WFLEDQY' width='426' height='480' frameBorder='0' class='giphy-embed' allowFullScreen></iframe><p><a href='https://giphy.com/gifs/gifitup-gif-it-up-europeana-l2JhGk8rR9WFLEDQY'>via GIPHY</a></p>";
  hangImage.appendChild(giphy);

  playButton.onclick = startGame;
}

function loadScoreBoard() {
  //load the remaining guesses
  var score = document.createElement("P");
  score.classList.add("score");
  score.innerHTML += "<span>Guesses Remaining:</span> " + "<span id='score' class='text-white'>" + gameChances + "</span>";
  scoreBoard.appendChild(score);
  //load the users wins 
  var wins = document.createElement("P");
  wins.classList.add("win");
  wins.innerHTML += "<span>User Wins:</span> " + userWins;
  winBoard.appendChild(wins);
  //load the audio controls
  var audio = document.createElement("P");
  audio.classList.add("audioControls");
  audio.innerHTML += "<span>Pause Audio:&nbsp;</span> <i class='fa fa-volume-off'></i></p>";
  audioBoard.appendChild(audio);
}

function loadLogo() {
  var imgLogo = document.createElement("IMG");
  imgLogo.classList.add("logo-img", "img-fluid");
  imgLogo.setAttribute("src", "assets/img/hangman-logo.png");
  logo.appendChild(imgLogo);
}

function hangManImage() {
  var img = document.createElement("IMG");
  img.classList.add("hang-img", "img-fluid");
  img.setAttribute("src", "assets/img/hangman.png");
  hangImage.appendChild(img);
}

function hangManImage1() {
  var img = document.createElement("IMG");
  img.classList.add("hang-img", "img-fluid");
  img.setAttribute("src", "assets/img/hangman" + (10 - gameChances) + ".png");
  hangImage.appendChild(img);
}
 
function enableButtons() {
  var titles = document.createElement("H5");
  titles.classList.add("crntWrd");
  titles.innerHTML += "Current Word:";
  currentBlock.appendChild(titles);

  var typed = document.createElement("H5");
  typed.classList.add("typed");
  typed.innerHTML += "Wrong Letters:";
  typedBlock.classList.add("greenbrdr", "py-3", "mb-4");
  typedBlock.appendChild(typed);

  var keyBoard = document.createElement("SPAN");
  keyBoard.classList.add("typed", "keyBtns", "d-block", "py-3");
  keyBoard.innerHTML += "Your keyboard below can save or end a life. OOOOHHH!! ";
  keyContainer.appendChild(keyBoard);
}



function playingLogic() {



// game set up  
// loop through the length of the answer and make buttons  
  for (var x = 0; x < randomNames.length; x++) {
    var name = randomNames[x];
    var hiddenChoice = document.createElement("BUTTON");
    hiddenChoice.classList.add("letter", "letter-button", "letter-button-color");
    hiddenChoice.innerHTML += "_";
    currentBlock.classList.add("greenbrdr", "py-3", "mb-4");
    currentBlock.appendChild(hiddenChoice);
  }
// create the keyboard  
  for (var i = 0; i < letters.length; i++) {
    var answer = letters[i];
    var letterBtn = document.createElement("BUTTON");
    letterBtn.classList.add("letter", "letter-button", "letter-button-color");
    letterBtn.setAttribute("data-letter", answer);
    letterBtn.innerHTML += answer;
    keyContainer.appendChild(letterBtn);
    letterBtn.onclick = beginGame;

  }
// game starts 
/* 

scope an empty array the length of randomNames and an array to hold wrong guesses

while gameChances is greater than Zero  
  player picks a letter 
  if correct 
    !! Add the guess to the correct index of the array (something like search right through RandomNames for the letter and insert it into the array)
    Use var n = str.indexOf("randomNames"); //gets where to put the guess in the array 
      var answers = [];
      answers.length = randomNames.length(); 


    print the array - span.innerHTML = answers.join();  
    sound plays 
    
  else 
    gameChances goes down 
    hangman image changes (src = 'hangman' + (gameChances - 10) + '.png')
    add wrong letter to wrongGuesses array and print 
end while 
  Player Loses 
  Game Resets 

*/
  function beginGame(event) {


      if (randomNames.includes(this.getAttribute("data-letter"))  &&  (gameChances >= 0)) {

      // I am still in-middle of completing the winning logic. This is the only thing pending after this commit. I will continue to work on it after the deadline just for the record this function is not was not 100% completed by the deadline. 
        this.classList.add("d-none");    
        this.indexOf("randomNames");
        rightAnswer.length = randomNames.length(); 
        console.log(rightAnswer);
        console.log(randomNames);
         } else {
         console.log("else");
         gameChances--;
          var score = document.getElementById("score");
         score.innerHTML = gameChances;

          this.classList.add("d-none");
          hangImage.innerHTML = "";
          hangManImage1();
         var pressedBtn = document.createElement("BUTTON");
          pressedBtn.classList.add("d-inline-block", "letter", "letter-button-color");
          pressedBtn.innerHTML += this.getAttribute("data-letter");
          typedBlock.appendChild(pressedBtn);
          if (gameChances === 0){
            keyContainer.innerHTML = "";
            var keyBoard = document.createElement("SPAN");
  keyBoard.classList.add("typed", "text-danger", "d-block", "py-3");
  keyBoard.innerHTML += "<h1>NATURAL SELECTION IS COMING FOR YOU!!!!</h1> <button id='resetBtn' class='startButton btn btn-primary greenBg my-3'>Start The Game</button> ";
  keyContainer.appendChild(keyBoard);
  var resetButton = document.getElementById("resetBtn")
  resetButton.addEventListener("click", function( event ) {
    location.reload();
  });

  }
  }
    

      
      
      
      
    






  

      
   



  
  }
}
function startGame() {
  homeScreen();
  clearBoard();
  loadScoreBoard();
  loadLogo();
  hangManImage();
  enableButtons();
  playingLogic();
}
/*
function GetRandomWord() 
  //generate a randomID 
  var _randomID = Math.floor((Math.random() * 10));
  
  //find the word having an ID that matches the randomID
  var _randomWord = jQuery.grep(words, function(word) {
    return word.id === _randomID;
  }); 

   return _randomWord;      
}  

function SetupPlayingField() {
randomWord = GetRandomWord();

//never use the same random word two times in a row
if (randomWord[0].word === lastUsedWord) {
  //request a new random word
  SetupPlayingField();
} else {
  //track the last random word used
  lastUsedWord = randomWord[0].word;
}

//displays a ? and line for each letter of the random word
for (x = 0; x < randomWord[0].word.length; x++) {
  arrLines[x].css('display', 'inline');
  arrLetters[x].text("?");
}    

}

function EnableButtons() {
  $.each(arrButtons, function() {
    //enable all alphabet buttons when a new game begins
    $(this).attr('disabled', false);
});
}


$($newGameBtn).on('click', function() {
StartUp();
});

function CheckGuess(_guess) {
var _arrLetters = randomWord[0].word.split("");
var _goodGuess = false;

//determine if the user made a good guess
$.each(_arrLetters, function(i) {
  if (_arrLetters[i] === _guess) {
    //show the chosen letter in its proper position (good guess)
    arrLetters[i].text(_guess);
    _goodGuess = true;
    goodGuess++;
  } 
});

if (!_goodGuess) {
    if (guesses < 5) {
      //display the chosen letter (bad guess)
      arrGuesses[guesses].text(_guess);
    }
    //game ends on the 6th bad guess
    arrBodyParts[guesses].css('display', 'inline');
    guesses++;
    
    if (guesses === 6) {
      GameOver("loss");
    }
} else {
  //game ends when the entire random word is displayed
  if(goodGuess === _arrLetters.length) {
    GameOver("win");
  }
}
}

function GameOver(_result) {
$.each(arrButtons, function() {
    //disable all alphabet buttons once the game ends
    $(this).attr('disabled', true);
});

if (_result === "win") {
  $message.text("You won! Play again!");
} else {
  $message.text("You lost. The word was " + randomWord[0].word + ". Play again!");    
}

//allow the user to start a new game
$newGame.css('visibility', 'visible');
}

var words = [
  { "id": 0, "word": "COMPUTER" }, 
  { "id": 1, "word": "LAPTOP" }, 
  { "id": 2, "word": "CODE" }, 
  { "id": 3, "word": "INTERNET" }, 
  { "id": 4, "word": "HANGMAN" }, 
  { "id": 5, "word": "PROGRAMMER" }, 
  { "id": 6, "word": "AWESOME" }, 
  { "id": 7, "word": "HELLO" }, 
  { "id": 8, "word": "CHICKENS" }, 
  { "id": 9, "word": "FUN" }
];
*/




/*
function ResetPlayingField() {
  //remove all good guess letters
  $.each(arrLetters, function(i) {
    this.text('');
  });
  //remove all bad guess letters
  $.each(arrGuesses, function() {
    this.text('');
  });
  
  //reset counters and hide new game display
  guesses = 0;
  goodGuess = 0;  
  $newGame.css('visibility', 'hidden');
}
*/


/*


// 1. Page loads: play song, add heading <h1>Hangman The Game!!!</h1>, add subtext <p class="subText">You have three options below. Choose Wisely</p>
// 2. Load two Buttons.  
// 3. btn-1: Instructions(empty() container and add uL with easy instructions and the game mascot right container)
// 4. btn-2: Start Game ()empty() container and replace column 1 with "_" for the game and add img state[0] to column 2 also have a keys that have already been pressed.
// 5. toggle keys and give them the ability to have user either type, or click on the letters to add them to the game. each key onlick gets a sound byte
// 6. math.random() to create the random word phrase to be used as computers choice. 
// 7. If user clicks on a letter that is contained in randomWord and that letter gets removes and user gets to choose another letter.
// 7.0 This goes on until user gets all letters in randomWord or user then a sound byte plays and <h1> appears on the screen and a button to play again appears. 
// 7.1  if users presses the wrong key gameChances--: then a red X pops ups with a sound byte, letter is marked red and the image in column 2 changes to next state.
// this goes on until user gets the right answer or  gameChances <= 0; 
// 7.2  if gameChances <= 0 red X pops ups with a sound byte .empty and add <h1> saying user sucks and should reconsider his place on earth.
*/