/* Datenbank */
export class NotizStorage {

    /** Private Eigenschaften */
    #aNotizen;

    /** Konstruktor */
    constructor(todoDatensaetze2) {
        this.#aNotizen = JSON.parse(localStorage.getItem('NotizStorage_v1') || "[ ]");
    }

    /** Public Methoden */

    /* Datensatz anhand Id zurueckgeben */
    getDatensatzById(iId) {
        this.getAlleDatensaetze();
        return this.#aNotizen.find(datensatz => parseInt(iId) === parseInt(datensatz.id));
    }

    /* Alle Datensaetze zurueckgeben */
    getAlleDatensaetze() {
        this.#aNotizen = JSON.parse(localStorage.getItem('NotizStorage_v1') || "[ ]");
        return this.#aNotizen;
    }

    /* Neuen Datensatz erstellen */
    insertDatensatz(oNotiz) {
        this.getAlleDatensaetze();
        oNotiz.id = this.#aNotizen.length + 1;
        this.#aNotizen.push(oNotiz);
        localStorage.setItem('NotizStorage_v1', JSON.stringify(this.#aNotizen));
    }

    /* Datensatz aktualisieren */
    updateDatensatz(oNotiz) {
        this.getAlleDatensaetze();
        const index = this.#aNotizen.findIndex(datensatz => datensatz.id == oNotiz.id);
        if(index > -1) {
            this.#aNotizen[index] = oNotiz;
        }
    }

}