/* Model Todo */
class ModelTodo {

    /* Private Eigenschaften */
    #id;
    #oDatumAbgeschlossen;
    #oDatumErstellt;

    /* Konstruktor */
    constructor(oTodo) {
        this.#id = this.#incrementId;
        this.#oDatumAbgeschlossen = null;
        this.#oDatumErstellt = new Date();
        this._sTitel = oTodo.sTitel;
        this._sBeschreibung = oTodo.sBeschreibung;
        this._iPrio = oTodo.iPrio;
        this._oDatumZuErledigenBis = oTodo.oDatumZuErledigenBis;
        this._bStatus = false;
    }

    /* Private Methoden */

    /* Datensatz Id erstellen */
    #incrementId() {
        if (!this._iLatestId) this._iLatestId = 1;
        else this._iLatestId++;
        return this._iLatestId;
    }    
    
    /* Setter */
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

    /* Getter */
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

    /* Public Eigenschaften */

    /* Public Methoden */
}

// export default {ModelTodo};








// https://www.tensorflow.org/js/guide/save_load

// await model.save('localstorage://my-model');

// const model = await tf.loadLayersModel('localstorage://my-model-1');


// let test = 'Das ist aus dem Model';