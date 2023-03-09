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
- User has 5 guesses
- Keyboard:
    - there is possibility to use keyboard that looks like qwerty keyboard
    - on the 3 row there is enter [...] backspace
    - if you press enter you make guess if you press backspace you remove the char from cell
    - you can also type words manually on your keyboard
*/

let numberOfGuesses = 0;
let selectedRow;
let selectedCell

const board = document.querySelector('.board');


for (let i = 0; i < 5; i++){
    selectedRow = numberOfGuesses;
    selectedCell = 0;

    const row = document.createElement('div');
    row.className = `row ${i}`;
    row.className.includes(selectedRow) ? row.id = "selected-row" : null;
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('div');
        cell.className = `cell ${i}-${j}`
        if (selectedCell === j) {
            cell.id = "selected-cell"
        }
        row.appendChild(cell);
    }
    board.appendChild(row);
}

const currentRow = document.getElementById('selected-row')
const currentCell = document.getElementById('selected-cell')



window.addEventListener('keydown', (e) => {
        currentCell.innerText = e.key
        selectedCell = selectedCell + 1;
        const nextCell = document.getElementsByClassName(`cell ${numberOfGuesses}-${selectedCell}`)
        console.log(nextCell[0])
        currentCell.id = ""
        nextCell[0].id = "selected-cell"
});




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
