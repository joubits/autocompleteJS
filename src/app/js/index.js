'use strict';
const { UI } =  require ('./UI');
const { State } = require('./State');

import appStyles from '../styles/app.scss';

const ui = new UI();
const state = new State();

// Search States
async function searchStates(search) {
    const data = await state.getState(search);
    // Show the states
    ui.outputHTML(data);
    // Events (click, mouseover, mouseout) in each div of list of states
    ui.stateSelectedEvents();
    // Initialize the i counter in UI
    ui.initializateCounter();
}


// Add new functionality WebkitSpeechRecognition (You can talk and it displays results in search input)
//document.addEventListener('DOMContentLoaded', ui.setVoiceRecognition);

// Begin to enter data input
search.addEventListener('input', () => searchStates(search.value) );
// Press UpDownkey
search.addEventListener('keydown', (e) => { ui.pressedDownUp(e); });
// When clicked outside remove match list
document.addEventListener("click", () =>  ui.clearMatchList() );

/* UI Functions */
// When click in X clean the input
ui.clearInput();

