/* Datenbank */
export class NotizStorage {

    /** Private Eigenschaften */
    #aNotizen;

    /** Konstruktor */
    constructor() {
        this.#aNotizen = JSON.parse(localStorage.getItem('NotizStorage_v1') || "[ ]");
    }

    /** Public Methoden */

    /* Datensatz anhand Id zurueckgeben */
    getDatensatzById(_iId) {
        this.getAlleDatensaetze();
        return this.#aNotizen.find(datensatz => parseInt(_iId) === parseInt(datensatz.id));
    }

    /* Alle Datensaetze zurueckgeben */
    getAlleDatensaetze() {
        this.#aNotizen = JSON.parse(localStorage.getItem('NotizStorage_v1') || "[ ]");
        return this.#aNotizen;
    }

    /* Neuen Datensatz erstellen */
    insertDatensatz(_oNotiz) {
        this.getAlleDatensaetze();
        _oNotiz.id = this.#aNotizen.length + 1;
        this.#aNotizen.push(_oNotiz);
        localStorage.setItem('NotizStorage_v1', JSON.stringify(this.#aNotizen));
    }

    /* Datensatz aktualisieren */
    updateDatensatz(_oNotiz) {
        this.getAlleDatensaetze();
        const index = this.#aNotizen.findIndex(datensatz => datensatz.id == _oNotiz.id);
        if(index > -1) {
            this.#aNotizen[index] = _oNotiz;
        }
    }

}