var wins = 0;
var losses = 0;
var wrong = [];

var Guesses = document.getElementById("Guesses-Remaining");
var lossestxt = document.getElementById("losses-text");
var winstxt = document.getElementById("wins-text");
var word = document.getElementById("HiddenWord");
var wronglet = document.getElementById("Wrong-letters")


var Wordoptions = ["zebra", "elephant", "monkey", "pig", "giraffe", "snake", "lemur", "rhinocerous", "panda"];


var Selectedword = Wordoptions[Math.floor(Math.random() * Wordoptions.length)];

var answerarr = [];
for (var i = 0; i < Selectedword.length; i++) {
    answerarr[i] = "_ ";
}

word.innerHTML = answerarr.join("");
var Guessesleft = 6;
Guesses.textContent = "Guesses remaining :" + Guessesleft;

wronglet.textContent = "Wrong letters: " + wrong;
lossestxt.textContent = "Losses :" + losses;
winstxt.textContent = "Wins :" + wins;

function Clearit() { //resets everything except wins and losses
    Guessesleft = 6;
    Selectedword = Wordoptions[Math.floor(Math.random() * Wordoptions.length)];
    answerarr = [];
    for (var i = 0; i < Selectedword.length; i++) {
        answerarr[i] = "_ ";
    }
    wrong = [];
    word.innerHTML = answerarr.join("");
    wronglet.textContent = "Wrong letters: " + wrong;
    Guesses.textContent = "Guesses remaining :" + Guessesleft;
}
document.onkeyup = function (event) {
    var anyFoundFlag = false;
    var anyFoundArray = [];
    for (i = 0; i < Selectedword.length; i++) {
        anyFoundArray.push(false)
    }
    var userGuess = event.key.toLowerCase();

    if (Guessesleft > 0) {

        //letter search loop
        for (i = 0; i < Selectedword.length; i++) {   //iterates throught the word to check each letter if it's the same as the guess

            if (userGuess === Selectedword[i]) {
                anyFoundArray[i] = true;
                anyFoundFlag = true;
            }
        }
        //right or wrong setting
        if (anyFoundFlag === true) {
            for (i = 0; i < Selectedword.length; i++) {
                if (anyFoundArray[i] === true) {
                    answerarr[i] = userGuess;
                    word.textContent = answerarr.join(" ");

                }
            }
        }
        else {
            if (wrong.indexOf(userGuess) === -1) {
                Guessesleft--;
                Guesses.textContent = "Guesses remaining :" + Guessesleft;
                wrong.push(userGuess)
                wronglet.textContent = "Wrong letters: " + wrong.join("");
            }
        }
    }
    //win condition needs to be placed before losses so a win is counted if you get it right on the last try
    if (answerarr.join("") === Selectedword) {
        wins++;
        winstxt.textContent = "Wins :" + wins;
        Clearit()
    }
    if (Guessesleft === 0) {
        losses++;
        lossestxt.textContent = "Losses :" + losses;
        Clearit()
    }

}

