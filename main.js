//elements
const startButton = document.querySelector(".start"),
    lvlName = document.querySelector(".message .lvl"),
    lvlSec = document.querySelector(".message .seconds"),
    word = document.querySelector(".word"),
    upComing = document.querySelector(".upcoming-words"),
    input = document.querySelector(".input"),
    TimeLeft = document.querySelector(".time span"),
    scoreGot = document.querySelector(".got"),
    scoreTotal = document.querySelector(".total"),
    finish = document.querySelector(".finish"),
    container = document.querySelector(".container"),
    dif = document.querySelector("#dificulty");

// the words
let words =
    `itself camp fine desert cook scale term none glass learn dark fade smart chase show reality waste time turn until`.split(
        " "
    );

//set levels
let lvl = {
    easy: 6,
    normal: 4,
    hard: 2,
};

//default level
let defaultLvlName = "easy";
let defaultLvlSeconds = lvl[defaultLvlName];

//set values
lvlName.innerHTML = defaultLvlName;
lvlSec.innerHTML = defaultLvlSeconds;
TimeLeft.innerHTML = defaultLvlSeconds;
scoreTotal.innerHTML = words.length;
//choose level

dif.addEventListener("click", (e) => {
    defaultLvlName = e.target.value;
    defaultLvlSeconds = lvl[defaultLvlName];
    lvlName.innerHTML = defaultLvlName;
    lvlSec.innerHTML = defaultLvlSeconds;
    TimeLeft.innerHTML = defaultLvlSeconds;
});

//Disable paste
input.onpaste = () => false;

//start game
startButton.onclick = function () {
    startButton.remove();
    dif.remove();
    input.focus();
    upComing.classList.remove("hide");
    genWords();
};

//generate words function
function genWords() {
    //random num
    let ran = Math.floor(Math.random() * words.length);
    //get random word
    let randomWord = words[ran];
    word.innerHTML = randomWord;
    //get word index
    let wordIndex = words.indexOf(randomWord);
    //remove word
    words.splice(wordIndex, 1);
    //empty upcoming words
    upComing.innerHTML = "";
    //upcoming words
    for (let i = 0; i < words.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.append(words[i]);
        upComing.append(newDiv);
    }
    if (upComing.children.length === 0) {
        upComing.classList.add("hide");
    }
    //call function
    startPlay();
}

//start timer function
function startPlay() {
    TimeLeft.innerHTML = defaultLvlSeconds;
    let start = setInterval(() => {
        TimeLeft.innerHTML--;
        if (+TimeLeft.innerHTML <= 0) {
            //stop timer
            clearInterval(start);
            //compare
            if (word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                //empty input
                input.value = "";
                //increase score
                scoreGot.innerHTML++;
                //new word
                if (words.length > 0) {
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    span.append("Good");
                    finish.append(span);
                    word.remove();
                    restart();
                    input.readOnly = true;
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                span.append("game over");
                finish.append(span);
                restart();
                input.readOnly = true;
            }
        }
    }, 1000);
    input.oninput = function () {
        if (word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
            clearInterval(start);
            //empty input
            input.value = "";
            //increase score
            scoreGot.innerHTML++;
            //new word
            if (words.length > 0) {
                genWords();
            } else {
                let span = document.createElement("span");
                span.className = "good";
                span.append("Good Work!");
                finish.append(span);
                word.remove();
                restart();
                input.readOnly = true;
            }
        }
    };
}
function restart() {
    let restart = document.createElement("button");
    restart.append("play again?");
    container.append(restart);
    restart.className = "restart";
    restart.onclick = function () {
        location.reload();
    };
}
