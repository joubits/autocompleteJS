export class UI {
    constructor() {
        this.search = document.getElementById('search');
        this.matchList = document.getElementById('match-list');
        this.i;
    }
    setVoiceRecognition() {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        let finalTranscript = '';
        let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.maxAlternatives = 10;
        recognition.continuous = true;
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            let transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
            }
            search.value = finalTranscript + interimTranscript;
        }
        recognition.start();
    }
    // Clear input when click x button
    clearInput() {
        this.search.onkeyup = () => {
            //Show the clear button if text input value is not empty
            let clearBtn = document.querySelector('#clean-icon');
            clearBtn.style.visibility = (this.search.value.length) ? "visible" : "hidden";
            // Hide the clear button on click, and reset the input value
            clearBtn.onclick = function() {
                this.style.visibility = "hidden";
                search.value = "";
            };
        }
    }
    // Display states in matchList div
    outputHTML(states) {
        if( states.length > 0 ){
            // show first 5 results
            if(states.length>=10){
                states = states.slice(1,11);  
            }
            const statediv = states.map(
                state => `
                <div>${state.name}</div>
                `
            ).join('');
            this.matchList.innerHTML = statediv;
        } else {
            this.matchList.innerHTML = "";
        }
    }
    // each state event
    stateSelectedEvents() {
        const statesSelected = document.querySelectorAll('.match-list div');
        statesSelected.forEach( (state) => {
            // OnClick event
            state.addEventListener('click', () => {
                state.classList.add('active');
                this.search.value = state.innerHTML;
                // remove list of states
                this.matchList.innerHTML = '';
            });
            // Mouseover
            state.addEventListener('mouseover', () => {
                state.classList.add('active');
                
            });
            // MouseOut
            state.addEventListener('mouseout', (e) => { 
                state.classList.remove('active');
            });
        } );
    }

    initializateCounter() {
        this.i = -1;
    }

    pressedDownUp(e) {
        const statesSelected = document.querySelectorAll('.match-list div');
        // Down key
        if (e.keyCode==40) {
            this.i++;
            this.addActive(statesSelected);
            //console.log(this.i);
        } // Up key
        else if (e.keyCode == 38) {
            this.i--;
            this.addActive(statesSelected);
        } // Enter key
        else if (e.keyCode == 13) {
            search.value = statesSelected[this.i].innerHTML;
            this.matchList.innerHTML = '';
    
        }
    }

    addActive(statesSelected) {
        if(!statesSelected) return false;
        this.removeActive(statesSelected);

        if (this.i >= statesSelected.length) this.i = 0;
        if (this.i < 0) this.i = (statesSelected.length - 1);
        
        statesSelected[this.i].classList.add('selected');
        search.value = statesSelected[this.i].innerHTML;
    }

    removeActive(statesSelected) {
        statesSelected.forEach( state => {
            state.classList.remove('selected');
        });
    }

    clearMatchList() {
        this.matchList.innerHTML = '';
    }
}