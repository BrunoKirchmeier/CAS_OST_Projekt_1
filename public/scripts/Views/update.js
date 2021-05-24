/** Funktionen: Views Rendering */
function changeHtmlNotiz(notiz) {
    return `<label class="titel-label" 
                   for="titel">Title</label>
            <input class="titel-input textbox-style-1" 
                   type="text" 
                   id="titel"
                   value="${notiz.sTitel}">
            <div class="leer1"></div>
            <label class="beschreibung-label" 
                   for="beschreibung">Beschreibung</label>
            <textarea class="beschreibung-text textbox-style-1" 
                      id="beschreibung"></textarea>
            <div class="leer2"></div>
            <label class="prio-label" 
                   for="prio">Wichtigkeit</label>
            <div class="prio-container-status" id="prio">
                <div>
                    <img class="blitz" src="./Bilder/Blitz.jpg" alt="Blitz">
                </div>
                <div>
                    <img class="blitz" src="./Bilder/Blitz.jpg" alt="Blitz">
                </div>
                <div>
                    <img class="blitz" src="./Bilder/Blitz.jpg" alt="Blitz">
                </div>
                <div>
                    <img class="blitz" src="./Bilder/Blitz.jpg" alt="Blitz">
                </div>
                <div>
                    <img class="blitz" src="./Bilder/Blitz.jpg" alt="Blitz">
                </div>
            </div>
            <div class="leer3"></div>
            <label class="datum-label" 
                   for="datum">Erledigt bis:</label>
            <div class="datum-container-input">
                <input class="datum-input textbox-style-1" 
                       type="date" 
                       id="datum">
                <div class="container-datum-bild">
                    <img class="kalender" 
                        src="./Bilder/Kalender.png" 
                        alt="Kalender">
                </div>
            </div>
            <div class="leer4"></div>
            <button class="speichern button-style-1">Speichern</button>
            <div class="leer5"></div>
            <button class="cancel button-style-1">
                    <a href="./index.html">Cancel</a>
            </button>`.join('');
}
