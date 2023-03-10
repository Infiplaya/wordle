/* WORDLE CLONE!
- Board:
    - board is a 5x5 grid
    - each cell is a place for one character
- User goal is to input 5 characters that match the correct word
    - After user guess:
        - if the guessed word is not in the word list then you get notification, and the input is not recorded
        - guessed character appears in specific place
        - if the character is on good place (it matches the correct word), the cell becomes green
        - if the character is on the correct word but in different place, the cell becomes yellow
        - if in correct word there is no guessed character, the cell remains dark gray
        
        - the problem I have is that 
- User has 5 guesses
- Keyboard:
    - there is possibility to use keyboard that looks like qwerty keyboard
    - on the 3 row there is enter [...] backspace
    - if you press enter you make guess if you press backspace you remove the char from cell
    - you can also type words manually on your keyboard
*/



let numberOfGuesses = 0;
let selectedRow = 0;
let selectedCell = 0;
let count = 0;
let duplicateCounter = 0;

let words = ['which', 'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound', 'great', 'again', 'still', 'every', 'small', 'found', 'those', 'never', 'under', 'might', 'while', 'house', 'world', 'below', 'asked', 'going', 'large', 'until', 'along', 'shall', 'being', 'often', 'earth', 'began', 'since', 'study', 'night', 'light', 'above', 'paper', 'parts', 'young', 'story', 'point', 'times', 'heard', 'whole', 'white', 'given', 'means', 'music', 'miles', 'thing', 'today', 'later', 'using', 'money', 'lines', 'order', 'group', 'among', 'learn', 'known', 'space', 'table', 'early', 'trees', 'short', 'hands', 'state', 'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes', 'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready', 'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green', 'stand', 'birds', 'start', 'river', 'tried', 'least', 'field', 'whose', 'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant', 'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor', 'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote', 'clear', 'named', 'books', 'child', 'glass', 'human', 'takes', 'party', 'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north', 'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape', 'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed', 'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep', 'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level', 'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch', 'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess', 'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic', 'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent', 'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast', 'thick', 'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth', 'rules', 'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps', 'sharp', 'visit', 'woods', 'chief', 'walls', 'cross', 'wings']
let won = false;
let lose = false;

const YELLOW = '#BED453'

const GREEN = '#538d4e'

const GREY = '#444';

const jsConfetti = new JSConfetti()

let correctWord;

function getRandomWord() {
    correctWord = words[Math.floor(Math.random() * words.length)];
}

getRandomWord();

console.log(correctWord)

const board = document.querySelector('.board');

function countDuplicates(wordArr) {
    let duplicates = {};
    wordArr.forEach((element) => {
        duplicates[element] = duplicates[element] + 1 || 1; 
    })

    return duplicates;
}

// Create 5x5 board
function buildBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 5; i++){
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `${i}`;
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = "cell"
            cell.innerText = ''
            cell.id = `${i}-${j}`
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

buildBoard();


// Make a keyboard on screen
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back']]
const keyboard = document.querySelector('.keyboard')

function buildKeyboard() {
    for (let i = 0; i < 3; i++) {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = "keyboardRow";
    
        for (let j = 0; j < keys[i].length; j++){
            const keyButton = document.createElement('button')
            keyButton.className = "keyButton";
            keyButton.innerHTML = keys[i][j];
            keyboardRow.appendChild(keyButton)
        }
    
        keyboard.appendChild(keyboardRow);
    }
}

buildKeyboard();

// grab all buttons in a keyboard
const keyboardKeys = document.querySelectorAll('.keyButton');

// for each button add event listener, enable to type by keyboard
keyboardKeys.forEach((key) => {
    let newKey = key.innerText.toLowerCase();
    key.addEventListener('click', () => {
        const won = checkWin();
    if (!won && numberOfGuesses <= 4) {
        let currentCell = findCurrentCell(selectedCell, selectedRow);
    if (selectedCell <= 4 && (keys[0].includes(newKey) || keys[1].includes(newKey) || keys[2].includes(newKey)) && newKey != "enter" && newKey != "back") {
        count = 0;
        currentCell.innerText = newKey;
        animateCellText();
        if (selectedCell < 4) {
            selectedCell++;
        };
    }

    if (newKey === 'back') {
        currentCell.innerText = '';
        if (count < 5) {
            count = count + 1;
        }
        if (count >= 1) {
            if (selectedCell > 0) {
                selectedCell--;
                currentCell = findCurrentCell(selectedCell, selectedRow);
                currentCell.innerText = '';
            } 
        } 
    }


    // check the word and go to the next if the word is inside the list of words
    if (newKey === 'enter') {
        let userArr = getUserWord();
        // Check if the word is not too short
        if (!userArr.includes('')) {
            let userWord = userArr.join('').toLowerCase();
            let message = validateWord(userWord);
            if (message === 'valid') {
                checkWord();
                animateCells();
                updateCurrentRow();
                checkKeyboard();
            } else {
                alert('Word not in dictionary')
            }
        }
        else {
            alert('Not enough words')
        }
        userWord = [];
    }
    }
    
    })
})


function findCurrentCell(selectedCell, selectedRow) {
    let currentCell = document.getElementById(`${selectedRow}-${selectedCell}`);
    return currentCell;
}


function findCurrentRow(selectedRow) {
    let currentRow = document.getElementById(`${selectedRow}`);
    let children = currentRow.children;
    return children
}

function animateCells() {
    const elements = findCurrentRow(selectedRow);
    for (const element of elements) {
      element.classList.toggle("transformed-state");
    }
  }

function animateCellText() {
    const element = findCurrentCell(selectedCell, selectedRow);
    element.classList.toggle("bounceKey")
}


// allow user to input the char
window.addEventListener('keydown', (e) => {
    let won = checkWin();
    if (!won && numberOfGuesses <= 4) {
    const key = e.key.toLowerCase()
    let currentCell = findCurrentCell(selectedCell, selectedRow);
    if (selectedCell <= 4 && (keys[0].includes(key) || keys[1].includes(key) || keys[2].includes(key)) && e.key != "Enter" && e.key != "Backspace") {
        count = 0;
        currentCell.innerText = key;
        animateCellText();
        if (selectedCell < 4) {
            selectedCell++;
            currentCell = findCurrentCell(selectedCell, selectedRow)
        };
    }

    if (e.key === 'Backspace') {
        currentCell.innerText = '';
        if (count < 5) {
            count = count + 1;
        }
        if (count >= 1) {
            if (selectedCell > 0) {
                selectedCell--;
                currentCell = findCurrentCell(selectedCell, selectedRow);
                currentCell.innerText = '';
                animateCellText();
            } 
        } 
    }
    // check the word and go to the next if the word is inside the list of words
    if (e.key === 'Enter') {
        let userArr = getUserWord();
        // Check if the word is not too short
        if (!userArr.includes('')) {
            let userWord = userArr.join('').toLowerCase();
            let message = validateWord(userWord);
            if (message === 'valid') {
                checkWord();
                animateCells();
                updateCurrentRow();
                checkKeyboard();
            } else {
                alert('Word not in dictionary')
            }
        }
        else {
            alert('Not enough words')
        }

        userWord = [];
    }
    }
})

function updateCurrentRow() {
    selectedCell = 0;
    selectedRow++;
    numberOfGuesses++;

    const lose = checkLose()
    if (lose) {
        alert(`You lost sry. The word was ${correctWord.toUpperCase()}`);
    }
}


// check if the list of words includes inputted word
function validateWord(word) {
    if (words.includes(word)) {
        return message = 'valid';
    }
    return message = 'invalid';
}


function checkWord() {
    let userArr = getUserWord();
    let correctArr = correctWord.split('')
    correctArr = correctArr.map((element) => element.toUpperCase());
    let children = findCurrentRow(selectedRow);

    let correctDuplicates = countDuplicates(correctArr)
    let userDuplicates = countDuplicates(userArr)

    for (let i = 0; i < children.length; i++) {
        // check if user characters are inside the correct word array
        if (correctArr.includes(userArr[i])) {
            if (correctDuplicates[children[i].innerText] >= userDuplicates[children[i].innerText]) {
                // turn background to yellow
                children[i].style.backgroundColor = YELLOW;
                // check if the character in input is in correct place
                if (userArr[i] === correctArr[i]) {
                    // turn background to green
                    children[i].style.backgroundColor = GREEN;
                }   
            }
        } else {
            children[i].style.backgroundColor = GREY
        }
    }

    // In this loop I check words that have more duplicates then the correct answer and if they overlapping char are in the same position

    for  (let i = 0; i < children.length; i++) {
        if (correctArr.includes(userArr[i]) && correctDuplicates[children[i].innerText] < userDuplicates[children[i].innerText]) {
            if (userArr[i] === correctArr[i]) {
                // turn background to green
                children[i].style.backgroundColor = GREEN;
                duplicateCounter++;
            }
        }
    }

    // In this loop I check words that have more duplicates, and the overlapping characters are not in the same position. I also check if the duplicate counter that I created is not greater than the duplicates in correct word
    for  (let i = 0; i < children.length; i++) {
        if (correctArr.includes(userArr[i]) && correctDuplicates[children[i].innerText] < userDuplicates[children[i].innerText]) {
            if (userArr[i] !== correctArr[i] && duplicateCounter < correctDuplicates[children[i].innerText]) {
                duplicateCounter++;
                children[i].style.backgroundColor = YELLOW;
            } 
        }
    }

    // Check if user won the game
    if (userArr.join('').toLowerCase() === correctWord) {
        won = true;
        jsConfetti.addConfetti()
    }

}

function checkWin() {
    return won;
}


function getUserWord() {
    let userArr = [];
    let correctArr = correctWord.split('')
    correctArr = correctArr.map((element) => element.toUpperCase());
    let children = findCurrentRow(selectedRow);

    for (let i = 0; i < children.length; i++) {
        userArr.push(children[i].innerText)
    }

    return userArr;
}

function checkLose() {
    const win = checkWin();
    if (numberOfGuesses >= 5 && !win) { 
        return lose = true;
    } 
}

checkLose();

// for each key button on the keyboard,
// I need to check if the key button text matches the char that is in the words that user Guessed
function checkKeyboard() {
    let cells = [];
    let children = findCurrentRow(selectedRow);
    if (selectedRow >= 1) {
        children = findCurrentRow(selectedRow - 1);
    }   

    for (let child of children) {
        cells.push(child);
    }

    for (let key of keyboardKeys) {
        for (let cell of cells ) {
            if (cell.innerText === key.innerText) {
                if (key.style.backgroundColor !== 'rgb(83, 141, 78)') {
                    key.style.backgroundColor = cell.style.backgroundColor;
                }

            }
        }
    }
}
