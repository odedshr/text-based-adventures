import { GameDefinition, DataVariable, Variable } from './types.js';

import processMethod from './processor.js';
import log from './log.js';
import initGame from './game-generator.js';
import { updateScore, updateClock } from './header.js';

import puzzle from './scenarios/mansion-escape/index.js';

const gameDefinition = initGame(puzzle);

// Get the DOM elements
const outputElement:HTMLOutputElement = document.getElementById('output') as HTMLOutputElement;
const userId = 'player1';
const history:string[] = [];
let historyIndex:number = -1;

// Function to handle user input and update the console
async function handleInput(input:string) {
    historyIndex = -1;
    history.push(input);

    log(input);
    const inputs = input.split(/[,;]| and /i).map(command => command.trim()).filter(Boolean)
    for (const input of inputs) {
        appendToPrint(`> ${input}`);
        await processMethod(input, gameDefinition, userId);
    }
}

// Append text to the console element
function appendToPrint(text:string) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text.replace(/\n/g, '<br>');
    outputElement.appendChild(paragraph);
    outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll to the bottom
}

function onKeyDown(event:KeyboardEvent) {
    const inputField = event.target as HTMLInputElement;
    
    // Only handle "ArrowUp" and "ArrowDown" keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        // Prevent the default behavior (moving the cursor)
        event.preventDefault();

        switch (event.key) {
            case 'ArrowUp': // Move up in the history if not already at the oldest entry
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                }
                break;
            case 'ArrowDown':  // Move down in the history if not already at the most recent entry
                if (historyIndex > 0) {
                    historyIndex--;
                } else {
                    // Reset to the empty state (no history selected)
                    historyIndex = -1;
                }
        }

        // Update the input field value based on the history index
        if (historyIndex >= 0 && historyIndex < history.length) {
            inputField.value = history[history.length - 1 - historyIndex];
        } else {
            // If historyIndex is -1, clear the input field
            inputField.value = '';
        }
    }
}

function init() {
    const inputField = document.getElementById('input') as HTMLInputElement;
    inputField.addEventListener('keydown', onKeyDown);

    gameDefinition.handlers?.push((_: GameDefinition, variableName:string, item:Variable) => {
        switch(variableName) {
            case 'achievements': updateScore(((item as DataVariable).value as string[]).length); break;
            case 'countdown': updateClock(+(item as DataVariable).value); break;
            case 'console': appendToPrint((item as DataVariable).value as string); break;
            case 'lives': if ((item as DataVariable).value===0) { inputField.setAttribute('hidden', 'true') } break;
        }
    });
    
    // Hook into the form submission event
    (document.getElementById('terminal') as HTMLFormElement).addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent form from submitting and refreshing the page
         
        const input = inputField.value.trim();
        
        if (input) {
            // Pass the input to handleInput function
            handleInput(input);
            
            // Clear the input field after processing
            inputField.value = '';
        }
    });

    appendToPrint(gameDefinition.strings.exposition as string);
    gameDefinition.startTimer('countdown');
}

init();