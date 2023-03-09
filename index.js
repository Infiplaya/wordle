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
const words = ['apple', 'penis', 'eagle', 'eagel', 'eeeee', 'aeege']

let correctWord = 'eagle'

const board = document.querySelector('.board');

function countDuplicates(wordArr) {
    let duplicates = {};
    wordArr.forEach((element) => {
        duplicates[element] = duplicates[element] + 1 || 1; 
    })

    return duplicates;
}



// Create 5x5 board
for (let i = 0; i < 5; i++){
    const row = document.createElement('div');
    row.className = 'row';
    row.id = `${i}`;
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('div');
        cell.className = "cell"
        cell.id = `${i}-${j}`
        row.appendChild(cell);
    }
    board.appendChild(row);
}

// Make a keyboard on screen
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back']]
const keyboard = document.querySelector('.keyboard')



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

// grab all buttons in a keyboard
const keyboardKeys = document.querySelectorAll('.keyButton');

// for each button add event listener, enable to type by keyboard
keyboardKeys.forEach((key) => {
    let newKey = key.innerText.toLowerCase();
    key.addEventListener('click', () => {
    let currentCell = findCurrentCell(selectedCell, selectedRow);
    if (selectedCell <= 4 && (keys[0].includes(newKey) || keys[1].includes(newKey) || keys[2].includes(key)) && newKey != "enter" && key.innerText != "back") {
        count = 0;
        currentCell.innerText = newKey;
        if (selectedCell < 4) {
            selectedCell++;
        };
    }

    if (newKey === 'back') {
        currentCell.innerText = '';
        if (count < 5) {    
            count = count + 1;
        }
        if (count > 1) {
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
                updateCurrentRow();
            } else {
                alert('Word not in dictionary')
            }
        }
        else {
            alert('Not enough words')
        }

        userWord = [];
    }
    })
})


function findCurrentCell(selectedCell, selectedRow) {
    let currentCell = document.getElementById(`${selectedRow}-${selectedCell}`);
    return currentCell;
}


function findCurrentRow(selectedRow) {
    let currentRow = document.getElementById(`${selectedRow}`);
    console.log(currentRow)
    let children = currentRow.children;
    return children
}



// allow user to input the char
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase()
    console.log("selected-cell", selectedCell)
    console.log("selected-row", selectedRow)
    let currentCell = findCurrentCell(selectedCell, selectedRow);
    if (selectedCell <= 4 && (keys[0].includes(key) || keys[1].includes(key) || keys[2].includes(key)) && e.key != "Enter" && e.key != "Backspace") {
        count = 0;
        currentCell.innerText = key;
        if (selectedCell < 4) {
            selectedCell++;
        };
    }

    if (e.key === 'Backspace') {
        currentCell.innerText = '';
        if (count < 5) {    
            count = count + 1;
        }
        if (count > 1) {
            if (selectedCell > 0) {
                selectedCell--;
                currentCell = findCurrentCell(selectedCell, selectedRow);
                currentCell.innerText = '';
            }   
        }
    }

    console.log("count1", count)

    // check the word and go to the next if the word is inside the list of words
    if (e.key === 'Enter') {
        let userArr = getUserWord();
        // Check if the word is not too short
        if (!userArr.includes('')) {
            let userWord = userArr.join('').toLowerCase();
            let message = validateWord(userWord);
            if (message === 'valid') {
                checkWord();
                updateCurrentRow();
            } else {
                alert('Word not in dictionary')
            }
        }
        else {
            alert('Not enough words')
        }

        userWord = [];
    }
})

function updateCurrentRow() {
    selectedCell = 0;
    selectedRow++;
    numberOfGuesses++;
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
                children[i].style.backgroundColor = '#BED453';
                // check if the character in input is in correct place
                if (userArr[i] === correctArr[i]) {
                    // turn background to green
                    children[i].style.backgroundColor = '#27C43F';
                }   
            }
        }
    }

    // In this loop I check words that have more duplicates then the correct answer and if they overlapping char are in the same position
    
    for  (let i = 0; i < children.length; i++) {
        if (correctArr.includes(userArr[i]) && correctDuplicates[children[i].innerText] < userDuplicates[children[i].innerText]) {
            if (userArr[i] === correctArr[i]) {
                // turn background to green
                children[i].style.backgroundColor = '#27C43F';
                console.log(children[i].style.backgroundColor === 'rgb(39, 196, 63)');
                duplicateCounter++;
            }
        }
    }

    for  (let i = 0; i < children.length; i++) {
        if (correctArr.includes(userArr[i]) && correctDuplicates[children[i].innerText] < userDuplicates[children[i].innerText]) {
            if (userArr[i] !== correctArr[i] && duplicateCounter < correctDuplicates[children[i].innerText]) {
                duplicateCounter++;
                children[i].style.backgroundColor = '#BED453';
            } 
        }
    }

    


    if (userArr.join('').toLowerCase() === correctWord) {
        alert("You won!")
    }
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



