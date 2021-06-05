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
    saveDatensatz(_oNotiz) {
        this.getAlleDatensaetze();
        _oNotiz.id = this.#aNotizen.length + 1;
        this.#aNotizen.push(_oNotiz);
        localStorage.setItem('NotizStorage_v1', JSON.stringify(this.#aNotizen));
        /* Pruefen ob Datensatz eingefügt wurde */
        const res = this.getDatensatzById(_oNotiz.id);
        if(res !== undefined) {
            return true;
        } else {
            return false
        }
    }

    /* Datensatz aktualisieren */
    updateDatensatz(_oNotiz) {
        this.getAlleDatensaetze();
        const index = this.#aNotizen.findIndex(datensatz => datensatz.id == _oNotiz.id);
        if(index > -1) {
            this.#aNotizen[index] = _oNotiz;
            return true;
        } else {
            return false;
        }
    }

    /* Datensatz löschen */
    deleteDatensatz(_iId) {
        this.getAlleDatensaetze();
        const index = this.#aNotizen.findIndex(datensatz => datensatz.id == _iId);
        if(index > -1) {
            this.#aNotizen.splice(index, 1);
            localStorage.setItem('NotizStorage_v1', JSON.stringify(this.#aNotizen));
            return true
        } else {
            return false;
        }
    }

}