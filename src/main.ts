import { NumberVariable, Variable } from './types';
// Example main.js file with ES6 module syntax
import processMethod from './processor.js';
import log from './log.js';
import gameDefinition from './scenarios/mansion-escape/game.js';
import { updateScore, updateTimer } from './header.js';

// Get the DOM elements
const outputElement:HTMLOutputElement = document.getElementById('output') as HTMLOutputElement;
const userId = 'player1';

// Function to handle user input and update the console
async function handleInput(input:string) {
    log(input);
    
    appendToConsole(await processMethod(input, gameDefinition, userId));
}

// Append text to the console element
function appendToConsole(text:string) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text.replace(/\n/g, '<br>');
    outputElement.appendChild(paragraph);
    outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll to the bottom
}

function init() {
    gameDefinition.handlers.push((variableName:string, item:Variable) => {
        switch(variableName) {
            case 'score': updateScore((item as NumberVariable).value); break;
            case 'countdown': updateTimer((item as NumberVariable).value); break;
        }
    });
    
    // Hook into the form submission event
    (document.getElementById('terminal') as HTMLFormElement).addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent form from submitting and refreshing the page
        
        const inputField = document.getElementById('input') as HTMLInputElement;
        const input = inputField.value.trim();
        
        if (input) {
            // Pass the input to handleInput function
            handleInput(input);
            
            // Clear the input field after processing
            inputField.value = '';
        }
    });

    appendToConsole(gameDefinition.strings.exposition);
}

init();