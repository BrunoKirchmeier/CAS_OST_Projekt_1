/* Modul Importe */
import {NotizStorage} from './data/notiz-storage.js';

/* Model Notiz */
export class NotizService {

    /** Private Eigenschaften */
    #id;
    #oDatumAbgeschlossen;
    #oDatumErstellt;
    #sTitel;
    #sBeschreibung;
    #iPrio;
    #oDatumZuErledigenBis;
    #bStatus;
    #oNotizStorage;
    #aNotizen;

    /** Konstruktor */
    constructor(_oNotiz = null) {

        if(_oNotiz != null) {
            this.#oDatumAbgeschlossen = null;
            this.#oDatumErstellt = new Date('2020-05-01');
            this.#sTitel = _oNotiz.sTitel || '';
            this.#sBeschreibung = _oNotiz.sBeschreibung || '';
            this.#iPrio = _oNotiz.iPrio || 5;
            this.#oDatumZuErledigenBis = _oNotiz.oDatumZuErledigenBis || new Date();
            this.#bStatus = false;
        }

        this.#oNotizStorage = new NotizStorage();
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
    }

    /** Private Methoden */

    /* Erledigte Datensaetze zurückgeben */
    #getErledigteDatensaetze(_aNotizen) {
        return _aNotizen.filter(datensatz => datensatz.bStatus === true);
    }

    /* Sortierfunktionen */
    #compareZuErledigen(_s1, _s2) {
        const oDate1 = new Date(_s1.oDatumZuErledigenBis);
        const oDate2 = new Date(_s2.oDatumZuErledigenBis);
        return oDate2 - oDate1;
    }

    #compareErstellt(_s1, _s2) {
        const oDate1 = new Date(_s1.oDatumErstellt);
        const oDate2 = new Date(_s2.oDatumErstellt);
        return oDate2 - oDate1;
    }

    #comparePrio(_s1, _s2) {
        return _s1.iPrio - _s2.iPrio;
    }

    /** Setter */
    set sTitel(_sTitel) {
        this.#sTitel = _sTitel;
    }

    set sBeschreibung(_sBeschreibung) {
        this.#sBeschreibung = _sBeschreibung;
    }

    set iPrio(_iPrio) {
        this.#iPrio = _iPrio;
    }

    set oDatumZuErledigenBis(_oDatumZuErledigenBis) {
        this.#oDatumZuErledigenBis = _oDatumZuErledigenBis;
    }

    set bStatus(_bStatus) {
        this.#bStatus = _bStatus;
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
        return this.#sTitel;
    }

    get sBeschreibung() {
        return this.#sBeschreibung;
    }

    get iPrio() {
        return this.#iPrio;
    }

    get oDatumZuErledigenBis() {
        return this.#oDatumZuErledigenBis;
    }

    get bStatus() {
        return this.#bStatus;
    }

    /** Public Methoden */

    /* Datensatz anhand Id zurueckgeben */
    getDatensatzById(_iId) {
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
        return this.#aNotizen.find(datensatz => parseInt(_iId) === parseInt(datensatz.id));
    }

    /* Datensaetze zurueckgeben */
    getDatensaetze(_sortingTyp = 'erledigt',
                   _filterTyp = '') {

        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
       
        // Alle Datensaetze oder nur Erledigte anzeigen
        if(_filterTyp =='abgeschlossen') {
            this.#aNotizen = this.#getErledigteDatensaetze(this.#aNotizen);
        }
        
        // Sortierung der Datensaetze
        if(_sortingTyp == 'erledigt') {
            return this.#aNotizen.sort(this.#compareZuErledigen);

        } else if(_sortingTyp == 'erstellt') {
            return this.#aNotizen.sort(this.#compareErstellt);

        } else if(_sortingTyp == 'prio') {
            return this.#aNotizen.sort(this.#comparePrio);
        }
    }

    /* Neuen Datensatz erstellen */
    saveDatensatz(_oNotiz) {
        return this.#oNotizStorage.saveDatensatz(_oNotiz)
    }

    /* Datensatz löschen */
    deleteDatensatz(_iId) {
        return this.#oNotizStorage.deleteDatensatz(_iId)
    }

}