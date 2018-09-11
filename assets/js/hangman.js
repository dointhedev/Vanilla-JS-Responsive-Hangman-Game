//Start of the application
document.addEventListener('DOMContentLoaded', homeScreen);

/*::::::DOM CACHE::::::*/
const keyContainer = document.getElementById("keyContainer");
const alreadyTyped = document.getElementById("alreadyTyped");
const scoreBoard = document.getElementById("scoreBoard");
const winBoard = document.getElementById("userWins");
const audioBoard = document.getElementById("sound_controls");
const currentBlock = document.getElementById("currentBlock");
const blankWord = document.getElementById("word-blanks");
const typedBlock = document.getElementById("typedBlock");
const logo = document.getElementById("logo");
const hangImage = document.getElementById("hangImage");
const leftCont = document.getElementById("left-cont");
const openingSound = document.createElement("audio");

/*::::::COUNTERS::::::*/
let gameChances = 0;
let userWins = 0;
let emptyNum = 0;

/*::::::DATA-SETS::::::*/
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
	"T", "U", "V", "W", "X", "Y", "Z"
];
const hangedNames = ["OBOE", "TRIANGLE", "BAGPIPE", "SAX", "FLUTE", "VIOLA", "HARP", "CLARINET", "PIANO", "DRUMS"];
let blanksAndSuccesses = [];

// Function to clear all HTML elements.
function clearBoard() {
	hangImage.innerHTML = "";
	logo.innerHTML = "";
	currentBlock.innerHTML = "";
	typedBlock.innerHTML = "";
	scoreBoard.innerHTML = "";
	winBoard.innerHTML = "";
	audioBoard.innerHTML = "";
}

// Function to load the audio when the game loads.
function loadAudio() {
	openingSound.setAttribute("src", "assets/audio/opening.mp3");
	openingSound.currentTime = 14;
	openingSound.play();
}

// Function for the audio controls.
function audioSet() {
	const audioTrk = document.getElementById("audio");
	const icon = document.getElementById("icon-s");

	let action = "Pause";
	if (audioTrk.innerText === "Pause Audio:") {
		openingSound.pause();
		action = "Start";
		icon.classList.replace("fa-volume-off", "fa-volume-up");
	} else {
		action = "Pause";
		openingSound.play();
		icon.classList.replace("fa-volume-up", "fa-volume-off");
	}
	// Use of ES6 backticks.
	audioTrk.innerHTML = `${action} Audio:`;
	audioTrk.appendChild(icon);
}

// Function generates the home screen.
function homeScreen() {
	loadLogo();
	const titles = document.createElement("H3");
	titles.classList.add("welcome");
	titles.innerHTML += "Welcome to Hangman: A Musical Journey";
	currentBlock.classList.add("py-3", "mb-4");
	currentBlock.appendChild(titles);
	const playButton = document.createElement("BUTTON");
	playButton.classList.add("startButton", "btn", "btn-primary", "greenBg", "my-3");
	playButton.innerHTML += "Start The Game";
	currentBlock.appendChild(playButton);

	const giphy = document.createElement("DIV");
	giphy.classList.add("py-3");

	giphy.innerHTML += "<iframe src='https://giphy.com/embed/l2JhGk8rR9WFLEDQY' width='426' height='480' frameBorder='0' class='giphy-embed' allowFullScreen></iframe><p><a href='https://giphy.com/gifs/gifitup-gif-it-up-europeana-l2JhGk8rR9WFLEDQY'>via GIPHY</a></p>";
	hangImage.appendChild(giphy);
	// Onclick event to start the game.
	playButton.onclick = playingLogic;
}

function loadScoreBoard() {
	// Load the remaining guesses.
	const score = document.createElement("P");
	score.classList.add("score");

	// I find this easier to read then the audio control solution below. I added both to show the options.
	score.innerHTML += "<span>Guesses Remaining:</span> " + "<span id='score' class='text-white'>" + gameChances + "</span>";
	scoreBoard.appendChild(score);

	// Load the user wins.
	const wins = document.createElement("P");
	wins.classList.add("win");
	wins.innerHTML += "<span>User Wins:</span> " + "<span id='wins' class='text-white'>" + userWins + "</span>";
	winBoard.appendChild(wins);

	// Load the audio controls. More complicated to read I feel. 
	const audio = document.createElement("P");
	audio.classList.add("audioControls");
	const icon = document.createElement("i");
	icon.setAttribute("id", "icon-s");
	icon.classList.add("pl-2", "cursor", "fa", "fa-volume-off", "text-white");
	const span = document.createElement("SPAN");
	span.setAttribute("id", "audio");
	span.classList.add("cursor");
	span.innerText = "Pause Audio:";
	span.appendChild(icon);
	audio.addEventListener("click", audioSet);
	audio.appendChild(span);
	audioBoard.appendChild(audio);
}

// Function to load the logo.
function loadLogo() {
	const imgLogo = document.createElement("IMG");
	imgLogo.classList.add("logo-img", "img-fluid");
	imgLogo.setAttribute("src", "assets/img/hangman-logo.png");
	logo.appendChild(imgLogo);
}

// Function to load the logo.
function hangManImgInit() {
	const img = document.createElement("IMG");
	img.classList.add("hang-img", "img-fluid");
	img.setAttribute("src", "assets/img/hangman.png");
	hangImage.appendChild(img);
}

// Function to transition the img src depending on the game round. 
function hangManImage() {
	const img = document.createElement("IMG");
	img.classList.add("hang-img", "img-fluid");
	img.setAttribute("src", "assets/img/hangman" + (10 - gameChances) + ".png");
	hangImage.appendChild(img);
}

// Function that generates the Current Words and Wrong Letters Elements, Logo and Keyboard text. 
function genContArea() {
	loadLogo();
	const titles = document.createElement("H5");
	titles.classList.add("crntWrd");
	titles.innerHTML += "Current Word:";
	currentBlock.appendChild(titles);
	const results = document.createElement("SPAN");
	results.classList.add("results");
	currentBlock.appendChild(results);

	const typed = document.createElement("H5");
	typed.classList.add("typed");
	typed.innerHTML += "Wrong Letters:";
	typedBlock.classList.add("greenbrdr", "py-3", "mb-4");
	typedBlock.appendChild(typed);

	const keyBoard = document.createElement("SPAN");
	keyBoard.classList.add("typed", "keyBtns", "d-block", "py-3");
	keyBoard.innerHTML += "Your keyboard below can save or end a life. OOOOHHH!! ";
	keyContainer.appendChild(keyBoard);
}

// The majority of the game's functionality is in this function. 
function playingLogic() {
	// Clear previous data.
	clearBoard();
	// Load Score Board
	loadScoreBoard();
	// Generate content area.
	genContArea();
	// Generate default hangman img.
	hangManImgInit();
	// Start the music
	loadAudio();

	// game setup.
	const randomNames = hangedNames[Math.floor(Math.random() * hangedNames.length)];

	// Here we *reset* the gamechances and blanksAndSuccesses array.
	blanksAndSuccesses = [];
	gameChances = 10;

	// Update DOM score.
	const score = document.getElementById("score");
	score.innerHTML = gameChances;

	// Generate blank characters.
	const hiddenChoices = document.createElement("H3");
	hiddenChoices.setAttribute("id", "word-blanks");
	for (let i = 0; i < randomNames.split("").length; i++) {
		blanksAndSuccesses.push(" " + "_" + " ");
	}

	hiddenChoices.innerHTML += blanksAndSuccesses.join("");
	currentBlock.appendChild(hiddenChoices);

	// Generate the keyboard.
	genKeys()

	function beginGame() {
		// Case to handle if clicked letter is in the randomName string and the game counter is not down to 0.
		if (randomNames.includes(this.getAttribute("data-letter")) && (gameChances >= 0)) {
			// Remove that letter from future use. 
			this.classList.add("d-none");
			// Create a variable for the clicked letter.
			const letter = this.getAttribute("data-letter");
			// pos is using the charsPos function to return the index's of the letter variable in the randomName string. 
			const pos = charPos(randomNames, letter);
			// ES6 iteration through the pos array to splice the specific letter into the correct index of the blanksAndSuccesses array. 
			for (let index of pos) {
				blanksAndSuccesses.splice(index, 1, letter);
			}
			// Clear currentBlock to update the inner content.
			currentBlock.innerHTML = " ";
			const titles = document.createElement("H5");
			titles.classList.add("crntWrd");
			titles.innerHTML += "Current Word: <br>" + blanksAndSuccesses.join("");
			currentBlock.appendChild(titles);
			// Case in which the user has won. Where the randomNames and blanksAndSuccesses match. 
			if (randomNames === blanksAndSuccesses.join("")) {
				userWins++;
				typedBlock.innerHTML = " ";
				const wins = document.getElementById("wins");
				wins.innerHTML = userWins;
				keyContainer.innerHTML = "";
				const winText = document.createElement("SPAN");
				winText.classList.add("typed", "text-success", "d-block", "py-3");
				const h1 = document.createElement("H1");
				h1.innerText = "YAY! You Won! Play Again?";
				const button = createBtn("endBtn", "danger", "End The Game");
				const button2 = createBtn("contBtn", "primary", "Continue The Game");
				winText.appendChild(h1);
				winText.appendChild(button);
				winText.appendChild(button2);
				keyContainer.appendChild(winText);
				const endButton = document.getElementById("endBtn");
				const contButton = document.getElementById("contBtn");
				contButton.addEventListener("click", playingLogic);
				endButton.addEventListener("click", restart);
				const score = document.getElementById("score");
				score.innerHTML = gameChances;

			}
		} else {
			// User chose the wrong answer.
			gameChances--;
			const score = document.getElementById("score");
			score.innerHTML = gameChances;

			this.classList.add("d-none");
			hangImage.innerHTML = "";
			hangManImage();
			const pressedBtn = document.createElement("BUTTON");
			pressedBtn.classList.add("d-inline-block", "letter", "letter-button-color");
			pressedBtn.innerHTML += this.getAttribute("data-letter");
			typedBlock.appendChild(pressedBtn);
			// User lost.
			if (gameChances === 0) {
				keyContainer.innerHTML = "";
				const lseTxt = document.createElement("SPAN");
				lseTxt.classList.add("typed", "text-danger", "d-block", "py-3");
				const h1 = document.createElement("H1");
				h1.innerText = "NATURAL SELECTION IS COMING FOR YOU!!!";

				const button = createBtn("resetBtn", "danger", "Reset The Game");

				lseTxt.appendChild(h1);
				lseTxt.appendChild(button);
				keyContainer.appendChild(lseTxt);
				const resetButton = document.getElementById("resetBtn");
				resetButton.addEventListener("click", restart);

			}
		}
	}

	function genKeys() {
		keyContainer.innerHTML = "";
		// Create the keyboard.
		for (let i = 0; i < letters.length; i++) {
			let answer = letters[i];
			const letterBtn = document.createElement("BUTTON");
			letterBtn.classList.add("letter", "letter-button", "letter-button-color");
			letterBtn.setAttribute("data-letter", answer);
			letterBtn.innerHTML += answer;
			keyContainer.appendChild(letterBtn);
			letterBtn.onclick = beginGame;
		}
	}

	// Function that takes in a string and a character argument and iterates through the string... 
	// returning an array with the index's of the character.  
	function charPos(str, char) {
		return str
			.split("")
			.map((c, i) => {
				if (c == char) return i;
			})
			.filter((v) => {
				return v >= 0;
			});
	}
	// Reset the game.
	function restart() {
		location.reload();
	}
	// Function to generate the buttons.
	function createBtn(id, style, text) {
		const button = document.createElement("BUTTON");
		button.setAttribute("id", id);
		button.classList.add("btn", "btn-" + style, "my-3", "ml-2");
		button.innerText = text;
		return button;
	}

}
