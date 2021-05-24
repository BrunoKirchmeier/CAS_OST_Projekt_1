/** DOM Referenzen */
const notizenParentElement = document.querySelector('.content');
const nodeNotizId = document.querySelector('[data-id]');

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
                                            <img class="${notiz.iPrio > 0 ? 'blitz-aktiv' : 'blitz-inaktiv'}" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="${notiz.iPrio > 1 ? 'blitz-aktiv' : 'blitz-inaktiv'}" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="${notiz.iPrio > 2 ? 'blitz-aktiv' : 'blitz-inaktiv'}" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="${notiz.iPrio > 3 ? 'blitz-aktiv' : 'blitz-inaktiv'}" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                        <div>
                                            <img class="${notiz.iPrio > 4 ? 'blitz-aktiv' : 'blitz-inaktiv'}" 
                                                src="./Bilder/Blitz.jpg" 
                                                alt="Blitz">
                                        </div>
                                    </div>
                                    <div class="notiz-container-status">
                                        <input class="notiz-status" 
                                            type="checkbox" 
                                            id ="notizStatus"
                                            name="notizStatus"
                                            ${notiz.bStatus === true ? 'checked' : ''}>
                                        <label for="notizStatus">
                                            Finished ${notiz.oDatumAbgeschlossen !== null ? '(' + notiz.oDatumAbgeschlossen + ')' : ''}
                                        </label>
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
                                                data-id="${notiz.id}">
                                            <a href="./update.html">Anpassen</a>
                                        </button>
                                    </div>
                                </div>`).join('');
}

/** Funktion: Update Notiz */
function updateNotiz(e) {
    // Pruefen ob Node vorhanden ist
    if (nodeNotizId !== null) {
        const Id = e.target.dataset.id;
        const model = new ModelTodo();
        const notiz = model.getDatensatzById(Id);
    }
}

/** Funktion: Initialisierung */
function reloadPage(nodeParent) {
    // Model Daten laden
    const todo = new ModelTodo();
    const notizen = todo.getDatensaetze();

    // Elemente dem DOM zuweisen
    nodeParent.insertAdjacentHTML('beforeend', createHtmlNotizen(notizen));
    // Event Handler Registrieren
    nodeParent.addEventListener('click', updateNotiz);
}

/** Events Handler */

/** Funktionsaufrufe */
reloadPage(notizenParentElement);
