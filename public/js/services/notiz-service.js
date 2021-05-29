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
    constructor(oNotiz = null) {

        if(oNotiz != null) {
            this.#oDatumAbgeschlossen = null;
            this.#oDatumErstellt = new Date();
            this.#sTitel = oNotiz.sTitel || '';
            this.#sBeschreibung = oNotiz.sBeschreibung || '';
            this.#iPrio = oNotiz.iPrio || 5;
            this.#oDatumZuErledigenBis = oNotiz.oDatumZuErledigenBis || new Date();
            this.#bStatus = false;
        }

        this.#oNotizStorage = new NotizStorage();
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
    }

    /** Private Methoden */

    /* Erledigte Datensaetze zurückgeben */
    #getErledigteDatensaetze(aNotizen) {
        return aNotizen.filter(datensatz => datensatz.bStatus === true);
    }

    /* Sortierfunktionen */
    #compareZuErledigen(s1, s2) {
        const oDate1 = new Date(s1.oDatumZuErledigenBis);
        const oDate2 = new Date(s2.oDatumZuErledigenBis);
        return oDate2 - oDate1;
    }

    #compareErstellt(s1, s2) {
        const oDate1 = new Date(s1.oDatumErstellt);
        const oDate2 = new Date(s2.oDatumErstellt);
        return oDate2 - oDate1;
    }

    #comparePrio(s1, s2) {
        return s1.iPrio - s2.iPrio;
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
    getDatensatzById(iId) {
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
        return this.#aNotizen.find(datensatz => parseInt(iId) === parseInt(datensatz.id));
    }

    /* Datensaetze zurueckgeben */
    getDatensaetze(sortingTyp = 'erledigt',
                   filterTyp = '') {

        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
       
        // Alle Datensaetze oder nur Erledigte anzeigen
        if(filterTyp =='abgeschlossen') {
            this.#aNotizen = this.#getErledigteDatensaetze(this.#aNotizen);
        } else

        // Sortierung der Datensaetze
        if(sortingTyp == 'erledigt') {
            return this.#aNotizen.sort(this.#compareZuErledigen);

        } else if(sortingTyp == 'erstellt') {
            return this.#aNotizen.sort(this.#compareErstellt);

        } else if(sortingTyp == 'prio') {
            return this.#aNotizen.sort(this.#comparePrio);
        }
    }

}