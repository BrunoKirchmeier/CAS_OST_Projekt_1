/* Model Todo */
class ModelTodo {

    /** Private Eigenschaften */
    #id;
    #oDatumAbgeschlossen;
    #oDatumErstellt;

    /** Konstruktor */
    constructor() { // oTodo
        /*
        this.#id = this.#incrementId;
        this.#oDatumAbgeschlossen = null;
        this.#oDatumErstellt = new Date();
        this._sTitel = oTodo.sTitel;
        this._sBeschreibung = oTodo.sBeschreibung;
        this._iPrio = oTodo.iPrio;
        this._oDatumZuErledigenBis = oTodo.oDatumZuErledigenBis;
        this._bStatus = false;
        */
    }

    /** Private Methoden */

    /* Datensatz Id erstellen */
    #incrementId() {
        if (!this._iLatestId) this._iLatestId = 1;
        else this._iLatestId++;
        return this._iLatestId;
    }    
    
    /** Setter */
    set sTitel(__sTitel) {
        this._sTitel = __sTitel;
    }

    set sBeschreibung(__sBeschreibung) {
        this._sBeschreibung = __sBeschreibung;
    }

    set iPrio(__iPrio) {
        this._iPrio = __iPrio;
    }

    set oDatumZuErledigenBis(__oDatumZuErledigenBis) {
        this._oDatumZuErledigenBis = __oDatumZuErledigenBis;
    }

    set bStatus(__bStatus) {
        this._bStatus = __bStatus;
        this.#oDatumAbgeschlossen = new Date();
    }

    /** Getter */
    get id() {
        return this.#id;
    }

    get oDatumAbgeschlossen() {
        return this.#oDatumAbgeschlossen;
    }

    get oDatumErstellt() {
        return this.#oDatumErstellt;
    }

    get sTitel() {
        return this.sTitel;
    }

    get sBeschreibung() {
        return this.sBeschreibung;
    }

    get iPrio() {
        return this.iPrio;
    }

    get oDatumZuErledigenBis() {
        return this.oDatumZuErledigenBis;
    }

    get bStatus() {
        return this.bStatus;
    }

    /** Public Methoden */

    /* Datensatz anhand Id zurueckgeben */
    getDatensatzById(iId) {
        return todoDatensaetze.find(iId => parseInt(iId) === parseInt(datensatz.id));
    }
}

// export default {ModelTodo};

/*
// Testdatensatz
let todoDatensaetze = [ {id: 1, oDatumAbgeschlossen: '12.06.2021', oDatumErstellt: '12.12.2020', sTitel: 'Test Datensatz 1', sBeschreibung: 'Das ist ein Testdatensatz mit der ID 1', iPrio: 2, oDatumZuErledigenBis: '12.12.2021', bStatus: true},
                        {id: 2, oDatumAbgeschlossen: null, oDatumErstellt: '12.12.2019', sTitel: 'Test Datensatz 2', sBeschreibung: 'Das ist ein Testdatensatz mit der ID 2', iPrio: 1, oDatumZuErledigenBis: '12.12.2022', bStatus: false}]

*/




// https://www.tensorflow.org/js/guide/save_load

// await model.save('localstorage://my-model');

// const model = await tf.loadLayersModel('localstorage://my-model-1');