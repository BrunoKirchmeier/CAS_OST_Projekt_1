/* Modul Importe */
import NotizService from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {

    /** Private Eigenschaften */
    #sortierung;
    #filter;
    #response;

    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.oNotizService = new NotizService();
        this.#sortierung = 'erledigt';
        this.#filter = 'offen';
    }

    /** Public Methoden */
    refreshPage(e1, Page) {
        /* Aktuelle Ansicht löschen */
        const oNodeHeader = document.querySelector('.header');
        const oNodeContent = document.querySelector('.content');
        const oNodeFooter = document.querySelector('.footer');

        /* PAGE: Index */
        if (Page === 'index') {
            /* Response API abwarten */
            this.oNotizService
            .getDatensaetze(this.#sortierung, 
                            this.#filter)
            .then((arrNotizen) => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter,
                                     arrNotizen);
            })
            .catch((error) => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter);
                alert('Error:', error);
            });

        /* PAGE: Detail */
        } else if (Page === 'detail') {
            /* Response API abwarten */
            this.oNotizService
            .getDatensatzById(e1.target.dataset.notizId)
            .then((arrNotizen) => {
                this.renderPageDetail(oNodeHeader,
                                      oNodeContent,
                                      oNodeFooter,
                                      arrNotizen);
            })
            .catch((error) => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter);
                alert('Error:', error);
            });
        }
    }

    /** Page Index HTML Rendern */
    renderPageIndex(oNodeHeader,
                    oNodeContent,
                    oNodeFooter,
                    arrNotizen = []) {

        /* Aktuelle View löschen */
        oNodeHeader.textContent = '';
        oNodeContent.textContent = '';
        /* View Template laden und in DOM einsetzen */
        const headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
        const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
        oNodeHeader.innerHTML = headerTemplateCompiled();
        oNodeContent.innerHTML = contentTemplateCompiled(
            {notiz: arrNotizen},
            {allowProtoPropertiesByDefault: true},
        );
        /* Radio Sortieren auf Checked setzen */
        const oNode = document.querySelector('input[name="sortieren"][value="' + this.#sortierung + '"');
        oNode.checked = true;
        /* Klasse für Page Bezeichung ändern */
        oNodeHeader.classList.remove('page-detail');
        oNodeHeader.classList.add('page-index');
        oNodeContent.classList.remove('page-detail');
        oNodeContent.classList.add('page-index');
        oNodeFooter.classList.remove('page-detail');
        oNodeFooter.classList.add('page-index');
        /* Dom Selektion */
        const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
        const oNodeButtonChangeStyle = document.querySelector('.button-change-style');
        const oNodeButtonChangeSort = document.querySelector('.button-change-sort');
        const oNodeButtonFilterAbgeschlossen = document.querySelector('.button-zeige-abgeschlossen');
        const oNodeButtonEditNotiz = document.querySelectorAll('.button-notiz-edit');
        const oNodeButtonDeleteNotiz = document.querySelectorAll('.button-notiz-delete');
        const oNodeButtonFinishedNotiz = document.querySelectorAll('.notiz-status');
        /* Attributte und Klasse für Buttons ändern */
        if(this.#filter === '') {
            oNodeButtonFilterAbgeschlossen.dataset.filterAbgeschlossen = 'ein';
            oNodeButtonFilterAbgeschlossen.classList.add('button-ist-aktiv');
        } else {
            oNodeButtonFilterAbgeschlossen.dataset.filterAbgeschlossen = 'aus';
            oNodeButtonFilterAbgeschlossen.classList.remove('button-ist-aktiv');
        }
        /* Eventlistener Registrieren */
        oNodeButtonNeueNotiz.addEventListener('click', (e2) => this.refreshPage(e2, 'detail'));
        oNodeButtonChangeStyle.addEventListener('change', (e2) => this.changeStyle(e2));
        oNodeButtonChangeSort.addEventListener('change', (e2) => this.changeSort(e2));
        oNodeButtonFilterAbgeschlossen.addEventListener('click', (e2) => this.changeFilter(e2));
        oNodeButtonFinishedNotiz.forEach((oNode) => {
            oNode.addEventListener('click', (e2) => this.setAbgeschlossen(e2));
        });
        oNodeButtonEditNotiz.forEach((oNode) => {
            oNode.addEventListener('click', (e2) => this.refreshPage(e2, 'detail'));
        });
        oNodeButtonDeleteNotiz.forEach((oNode) => {
            oNode.addEventListener('click', (e2) => this.deleteDatensatz(e2));
        });
    }

    /** Page Index HTML Rendern */
    renderPageDetail(oNodeHeader,
                     oNodeContent,
                     oNodeFooter,
                     arrNotizen = []) {

        /* Aktuelle View löschen */
        oNodeHeader.textContent = '';
        oNodeContent.textContent = '';
        /* View Template laden und in DOM einsetzen */
        const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
        oNodeContent.innerHTML = contentTemplateCompiled(
            {notiz: arrNotizen},
            {allowProtoPropertiesByDefault: true},
        );
        /* Klasse für Page Bezeichung ändern */
        oNodeHeader.classList.remove('page-index');
        oNodeHeader.classList.add('page-detail');
        oNodeContent.classList.remove('page-index');
        oNodeContent.classList.add('page-detail');
        oNodeFooter.classList.remove('page-index');
        oNodeFooter.classList.add('page-detail');
        /* Dom Selektion */
        const oNodeButtonCancel = document.querySelector('.cancel');
        const oNodeButtonSpeichern = document.querySelector('.speichern');
        /* Eventlistener Registrieren */
        const oNodeButtonPrio = document.querySelectorAll('.prio-wert-setzen');
        oNodeButtonPrio.forEach((oNode) => {
            oNode.addEventListener('click', (e2) => this.setPrioWert(e2));
        });
        oNodeButtonCancel.addEventListener('click', (e2) => this.refreshPage(e2, 'index'));
        oNodeButtonSpeichern.addEventListener('click', (e2) => this.saveDatensatz(e2));
    }

    /** Datensatz speichern */
    saveDatensatz(e) {
        const errMessages = [];
        let titel = '';
        let beschreibung = '';
        let prio = 5;
        let datumZuErledigenBis = '';

        /** Eingabe Validierungen Client */
        /** Feld: Titel */
        let oNode = document.querySelector('.titel-input');
        if (oNode === null
            || typeof (oNode.value) !== 'string'
            || oNode.value === '') {
                errMessages.push({message: 'Feld Titel darf nicht leer sein'});
        } else {
            titel = oNode.value;
        }

        /** Feld: Beschreibung */
        oNode = document.querySelector('.beschreibung-text');
        if (oNode === null
            || typeof (oNode.value) !== 'string'
            || oNode.value === '') {
                errMessages.push({message: 'Feld Beschreibung darf nicht leer sein'});
        } else {
            beschreibung = oNode.value;
        }

        /** Feld: Prio */
        oNode = document.querySelector('.prio-container-status');
        if (oNode === null
            || oNode.dataset.prioWert === undefined
            || typeof (oNode.dataset.prioWert) !== 'string'
            || oNode.dataset.prioWert < 1
            || oNode.dataset.prioWert > 5) {

                errMessages.push({message: 'Feld Wichtigkeit muss Wert von 1 bis 5 haben'});
        } else {
            prio = oNode.dataset.prioWert;
        }

        /** Feld: Erledigen bis */
        oNode = document.querySelector('.datum-input');
        if (oNode === null
            || typeof (oNode.value) !== 'string'
            || Number.isNaN(Date.parse(oNode.value)) === true) {
                errMessages.push({message: 'Feld Erledigt bis ist kein gültiges Datumsfeld'});
        } else {
            datumZuErledigenBis = new Date(oNode.value);
        }

        /** Validierungsfehler erkannt. Datensatz wird nicht geschrieben */
        if (Object.keys(errMessages).length !== 0) {
            /* View Template laden und in DOM einsetzen */
            const oNodeValitaion = document.querySelector('.validation-container');
            const validationTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-validate-template').innerHTML);
            oNodeValitaion.innerHTML = validationTemplateCompiled(
                {error: errMessages},
                {allowProtoPropertiesByDefault: true},
            );

        /** Schreiben in Datenbank */
        } else {
            let res = false;
            const oNotiz = {sTitel: titel,
                            sBeschreibung: beschreibung,
                            iPrio: prio,
                            oDatumZuErledigenBis: datumZuErledigenBis};

            /** Pruefen ob es sich um ein Update oder einen neuen Datensatz handelt */
            if (e !== undefined
                && e.target.dataset.notizId !== undefined) {
                /* Update in Datenbank */
                this.oNotizService.saveDatensatz(oNotiz, e.target.dataset.notizId)
                .then((result) => {
                    this.refreshPage(undefined,
                                     'index');
                })
                .catch((error) => {
                    this.refreshPage(undefined,
                                     'index');
                    alert('Error:', error);
                });

            } else {
                /* Neu in Datenbank */
                this.oNotizService.saveDatensatz(oNotiz)
                .then((result) => {
                    this.refreshPage(undefined,
                                     'index');
                })
                .catch((error) => {
                    this.refreshPage(undefined,
                                     'index');
                    alert('Error:', error);
                });
            }
            /* View Template index neu laden */
            if (res === true) {
                this.refreshPage(undefined, 'index');
            }
        }
    }

    /** Datensatz speichern */
    deleteDatensatz(e) {
        /* Response API abwarten */
        this.oNotizService.deleteDatensatz(e.target.dataset.notizId)
        .then((result) => {
            this.refreshPage(undefined,
                             'index');
        })
        .catch((error) => {
            this.refreshPage(undefined,
                             'index');
            alert('Error:', error);
        });
    }

    /** Layout Style ändern */
    changeStyle(e) {
        this.oNodeBody = document.querySelector('.body-container');
        if (e.target.value === 'white') {
            this.oNodeBody.classList.remove('style-mode-dark');
        } else if (e.target.value === 'dark') {
            this.oNodeBody.classList.add('style-mode-dark');
        }
    }

    /** Sortierung der Liste der Datensätze ändern */
    changeSort(e) {
        this.#sortierung = e.target.value;
        this.refreshPage(undefined, 'index');
    }

    /** Filtern der Liste der anzuzeigenden Datensätze */
    changeFilter(e) {
        /** Abgeschlossene Element ausblenden */
        if(e.target.dataset.filterAbgeschlossen == 'aus') {
            this.#filter = '';
            this.refreshPage(undefined, 'index');
        /** Alle Emenete anzeigen */
        } else {
            this.#filter = 'offen';
            this.refreshPage(undefined, 'index');
        }
    }

    /** Todo als abgeschlossen markieren */
    setAbgeschlossen (e) {
        /* Response API abwarten */
        this.oNotizService
        .getDatensatzById(e.target.dataset.notizId)
        .then((oNotizAlt) => {
            const oNotizNeu = oNotizAlt.bStatus === true ? {bStatus: false} : {bStatus: true};
            /* Update in Datenbank */
            this.oNotizService.saveDatensatz(oNotizNeu, 
                                             e.target.dataset.notizId);
        })
        .then((result) => {
            this.refreshPage(undefined,
                            'index');
        })
        .catch((error) => {
            this.refreshPage(undefined,
                            'index');
            alert('Error:', error);
        });
    }

    /** Wert Priorität setzen */
    setPrioWert(e) {
        const oNodeContainerPrio = document.querySelector('.prio-container-status');
        oNodeContainerPrio.dataset.prioWert = e.target.dataset.prioWert;
        const oNodePrioElemente = document.querySelectorAll('.prio-container-status img');
        oNodePrioElemente.forEach((oNode) => {
            if (oNode.dataset.prioWert > e.target.dataset.prioWert) {
                oNode.classList.add('blitz-inaktiv');
                oNode.classList.remove('blitz-aktiv');
            } else {
                oNode.classList.add('blitz-aktiv');
                oNode.classList.remove('blitz-inaktiv');
            }
        });
    }

}

/* DOM Laden */
window.addEventListener('DOMContentLoaded', function() {

    /* Handelbar Helper: Vergleichen */
    Handlebars.registerHelper('xIf', function(a, operator, b, opts) {
        var bool = false;
        switch(operator) {
           case '==':
               bool = a == b;
               break;
           case '>':
               bool = a > b;
               break;
           case '<':
               bool = a < b;
               break;
           default:
               throw "Unknown operator " + operator;
        }

        if (bool) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    /* Handelbar Helper: Datumsformat Konvertieren */
    Handlebars.registerHelper('formatDate', function (sDateIn, sFormat) {
        const options_view = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        const options_mysql = { year: 'numeric', month: '2-digit', day: '2-digit'};

        let sDateOut = null;

        switch(sFormat) {
            case 'mysql':
                sDateOut = new Date(sDateIn).toLocaleString('de-DE', options_mysql)
                                               .replaceAll('.', '-');
                sDateOut = sDateOut.split('-').reverse().join('-');
               break;
            default:
                sDateOut = new Date(sDateIn).toLocaleString('de-DE', options_view);
        }

        return sDateOut;
    });

    /* Instanzierung Controller */
    const oTodo = new TodoController();
    oTodo.refreshPage(undefined, 'index');
});