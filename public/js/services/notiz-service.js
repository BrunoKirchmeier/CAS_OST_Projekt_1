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

        this.#oNotizStorage = new NotizStorage();
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();

        if(_oNotiz != null) {
            this.#id = this.#aNotizen.length + 1;
            this.#oDatumAbgeschlossen = null;
            this.#oDatumErstellt = new Date();
            this.#sTitel = _oNotiz.sTitel || '';
            this.#sBeschreibung = _oNotiz.sBeschreibung || '';
            this.#iPrio = _oNotiz.iPrio || 5;
            this.#oDatumZuErledigenBis = _oNotiz.oDatumZuErledigenBis || new Date();
            this.#bStatus = false;
        } else {
            this.#id = this.#aNotizen.length + 1;
            this.#oDatumAbgeschlossen = null;
            this.#oDatumErstellt = new Date();
            this.#sTitel = '';
            this.#sBeschreibung = '';
            this.#iPrio = 5;
            this.#oDatumZuErledigenBis = new Date();
            this.#bStatus = false;
        }
    }

    /** Private Methoden */

    /* Nur offene Datensaetze zurückgeben */
    #getOffeneDatensaetze(_aNotizen) {
        return _aNotizen.filter(datensatz => datensatz.bStatus !== true);
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
        /* Datensatz laden */
        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
        const datensatz = this.#aNotizen.find(datensatz => parseInt(_iId) === parseInt(datensatz.id)); 
        /* Datensatz prüfen */
        if(datensatz === undefined) {
            return false;
        } else {
            /* Datensatz Inhalt prüfen */
            if(datensatz.hasOwnProperty('oDatumErstellt')) {
                /* Datum Erstellung formatieren */
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let oDatum = new Date(datensatz.oDatumErstellt);
                datensatz.oDatumErstellt = oDatum.toLocaleDateString('de-DE', options);
                return datensatz;
            /* Datensatz Inhalt fehlerhaft*/
            } else {
                return false;
            }
        }
    }

    /* Datensaetze zurueckgeben */
    getDatensaetze(_sortingTyp = 'erledigt',
                   _filterTyp = '') {

        this.#aNotizen = this.#oNotizStorage.getAlleDatensaetze();
       
        // Anzeige Datumswerte formatieren
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.#aNotizen.forEach(datensatz => {
            /* Datum Erledigen bis formatieren */
            let oDatum = new Date(datensatz.oDatumZuErledigenBis);
            datensatz.oDatumZuErledigenBis = oDatum.toLocaleDateString('de-DE', options);
        });

        // Alle Datensaetze oder nur Erledigte anzeigen
        if(_filterTyp =='offen') {
            this.#aNotizen = this.#getOffeneDatensaetze(this.#aNotizen);
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

    /* Datensatz speichern */
    saveDatensatz(_oNotiz, _iId) {
        /* Datensatz Neu */
        if (_iId === undefined) {
            const oNotiz = {sTitel: _oNotiz.sTitel,
                            sBeschreibung: _oNotiz.sBeschreibung,
                            iPrio: _oNotiz.iPrio,
                            oDatumZuErledigenBis: _oNotiz.oDatumZuErledigenBis,
                            oDatumAbgeschlossen: this.#oDatumAbgeschlossen,
                            oDatumErstellt: this.#oDatumErstellt,
                            bStatus: this.#bStatus };
            return this.#oNotizStorage.insertDatensatz(oNotiz);

        /* Datensatz Update */   
        } else {
            const oNotizDatenbank = this.#oNotizStorage.getDatensatzById(_iId);
            for( let property in oNotizDatenbank) {
                if(_oNotiz.hasOwnProperty(property) === true) {
                    oNotizDatenbank[property] = _oNotiz[property];
                } 
            }
            return this.#oNotizStorage.updateDatensatz(oNotizDatenbank);
        }
    }

    /* Datensatz löschen */
    deleteDatensatz(_iId) {
        return this.#oNotizStorage.deleteDatensatz(_iId)
    }

}