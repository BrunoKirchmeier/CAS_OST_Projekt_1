 /* let todo = {sTitel: 'titel1', sBeschreibung: 'die BEschreibung', iPrio: 2, oDatumZuErledigenBis: new Date(2022, 2, 5)};
 const test = new ModelTodo(todo); */

/** Funktionen Controller */

/* Notiz speichern */
function handleTodoSpeichern() {
    // Pruefen ob id vorhanden ist. In diesem Fall ist es ein update und keiner neuer Datensatz
}

/* Notiz Details Anzeigen zum Berabeiten */
function handleTodoBearbeiten() {}

    const nodeId = document.querySelector('[data-id]');

    // Datensatz Id gefunden. Daten abfragen und Felder vorabfüllen
    if(nodeId !== null) {
        const todo = new ModelTodo();
        todo.getDatensatzById(1);
    }



    
/** Funktionen Views */
function createHtmlNotizen(notizen) {
    return notizen.map((notiz) => `<div class="notiz-container">
                                    <div class="notiz-container-datum">
                                        <p>${notiz.oDatumZuErledigenBis}</p>
                                    </div>
                                    <div class="notiz-container-titel">
                                        <p>${notiz.sTitel}</p>
                                    <div class="notiz-container-prio">
                                        <div>
                                            <img class="blitz" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="blitz" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="blitz" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="blitz" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="blitz" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                    </div>
                                    <div class="notiz-container-status">
                                        <input class="notiz-status" 
                                            type="checkbox" 
                                            id ="notizStatus"
                                            name="notizStatus">
                                        <label for="notizStatus">Finished</label>
                                    </div>
                                    <div class="notiz-container-text">
                                        <textarea class="textarea textbox-style-1"
                                                id="notizText"
                                                rows="2" 
                                                disabled>${notiz.sBeschreibung}
                                        <label for="notizText">
                                            <svg viewBox="0 0 100 100">
                                            <polygon points="0,25 100,25 50,75 0,25"
                                                        fill="black">
                                            </polygon>
                                            </svg>
                                        </label>
                                    </div>
                                    <div class="notiz-container-edit">
                                        <button class="button-notiz-edit button-style-1"
                                                data-id="${notiz.id}">Anpassen</button>
                                </div>`).join('');
}

/** Events Registrieren */
// document.querySelector('.speichern').addEventListener('click', handleTodoSpeichern);
// document.querySelector('.notiz-container-edit').addEventListener('click', handleTodoBearbeiten);


/** Funktionen Controller */
function renderNotizen() {
    // Model Daten laden
    

    // Parent HTML Element
    const notizenParentElement = document.querySelector('.content');


    // createHtmlNotizen
}





// getDatensatzById

    