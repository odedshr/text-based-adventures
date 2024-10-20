var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import processMethod from './processor.js';
import log from './log.js';
import gameDefinition from './scenarios/mansion-escape/game.js';
import { updateScore, updateTimer } from './header.js';
// Get the DOM elements
const outputElement = document.getElementById('output');
const userId = 'player1';
const history = [];
let historyIndex = -1;
// Function to handle user input and update the console
function handleInput(input) {
    return __awaiter(this, void 0, void 0, function* () {
        historyIndex = -1;
        history.push(input);
        log(input);
        appendToprint(`> ${input}`);
        appendToprint(yield processMethod(input, gameDefinition, userId));
    });
}
// Append text to the console element
function appendToprint(text) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text.replace(/\n/g, '<br>');
    outputElement.appendChild(paragraph);
    outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll to the bottom
}
function onKeyDown(event) {
    const inputField = event.target;
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
            case 'ArrowDown': // Move down in the history if not already at the most recent entry
                if (historyIndex > 0) {
                    historyIndex--;
                }
                else {
                    // Reset to the empty state (no history selected)
                    historyIndex = -1;
                }
        }
        // Update the input field value based on the history index
        if (historyIndex >= 0 && historyIndex < history.length) {
            inputField.value = history[history.length - 1 - historyIndex];
        }
        else {
            // If historyIndex is -1, clear the input field
            inputField.value = '';
        }
    }
}
function init() {
    const inputField = document.getElementById('input');
    inputField.addEventListener('keydown', onKeyDown);
    gameDefinition.handlers.push((variableName, item) => {
        switch (variableName) {
            case 'achievements':
                updateScore(item.value.length);
                break;
            case 'countdown':
                updateTimer(item.value);
                break;
            case 'console':
                appendToprint(item.value);
                break;
            case 'lives':
                if (item.value === 0) {
                    inputField.setAttribute('hidden', 'true');
                }
                break;
        }
    });
    // Hook into the form submission event
    document.getElementById('terminal').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting and refreshing the page
        const input = inputField.value.trim();
        if (input) {
            // Pass the input to handleInput function
            handleInput(input);
            // Clear the input field after processing
            inputField.value = '';
        }
    });
    appendToprint(gameDefinition.strings.exposition);
}
init();
