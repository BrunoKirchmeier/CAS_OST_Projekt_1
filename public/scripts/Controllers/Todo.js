/** DOM Referenzen */
const notizenParentElement = document.querySelector('.content');

/** Funktionen: Views Rendering */
function createHtmlNotizen(notizen) {
    return notizen.map((notiz) => `<div class="notiz-container">
                                    <div class="notiz-container-datum">
                                        <p>${notiz.oDatumZuErledigenBis}</p>
                                    </div>
                                    <div class="notiz-container-titel">
                                        <p>${notiz.sTitel}</p>
                                    </div>
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
                                                disabled>${notiz.sBeschreibung}</textarea>
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
                                                data-id="${notiz.id}">Anpassen
                                        </button>
                                    </div>
                                </div>`).join('');
}

/** Funktionen: Events */
function notizRefreshPage() {
    
}

function notizNeu() {
    
}

function notizenBearbeiten(e) {
    const nodeId = document.querySelector('[data-id]');
    // Datensatz Id gefunden. Daten abfragen und Felder vorabfüllen
    if (nodeId !== null) {
        const Id = e.target.dataset.id;
        const todo = new ModelTodo();
        const daten = todo.getDatensatzById(Id);
    }
}

function renderNotizen(node) {
    // Model Daten laden
    const todo = new ModelTodo();
    const notizen = todo.getDatensaetze();

    // Elemente dem DOM zuweisen
    node.insertAdjacentHTML('beforeend', createHtmlNotizen(notizen));
    // Event Handler Registrieren
    notizenParentElement.addEventListener('click', notizenBearbeiten);
}

renderNotizen(notizenParentElement);