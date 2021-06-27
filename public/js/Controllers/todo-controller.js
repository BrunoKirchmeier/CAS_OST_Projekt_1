/* Modul Importe */
import NotizService from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {
    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.oNotizService = new NotizService();
        this.sortierung = 'erledigt';
        this.filter = 'offen';
    }

    /** Public Methoden */
    refreshPage(e, Page) {
        /* Aktuelle Ansicht löschen */
        const oNodeHeader = document.querySelector('.header');
        const oNodeContent = document.querySelector('.content');
        const oNodeFooter = document.querySelector('.footer');

        /* PAGE: Index */
        if (Page === 'index') {
            /* Response API abwarten */
            this.oNotizService
            .getDatensaetze(this.sortierung,
                            this.filter)
            .then((arrNotizen) => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter,
                                     arrNotizen);
            })
            .catch(() => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter);
            });

        /* PAGE: Detail */
        } else if (Page === 'detail') {
            /* Response API abwarten */
            this.oNotizService
            .getDatensatzById(e.target.dataset.notizId)
            .then((arrNotizen) => {
                this.renderPageDetail(oNodeHeader,
                                      oNodeContent,
                                      oNodeFooter,
                                      arrNotizen);
            })
            .catch(() => {
                this.renderPageIndex(oNodeHeader,
                                     oNodeContent,
                                     oNodeFooter);
            });
        }
    }

    /** Page Index HTML Rendern */
    renderPageIndex(oNodeHeader,
                    oNodeContent,
                    oNodeFooter,
                    arrNotizen = []) {

console.log(arrNotizen);

        /* Parameter speichern */
        this.oNodeHeader = oNodeHeader;
        this.oNodeContent = oNodeContent;
        this.oNodeFooter = oNodeFooter;
        /* Aktuelle View löschen */
        this.oNodeHeader.textContent = '';
        this.oNodeContent.textContent = '';
        /* View Template laden und in DOM einsetzen */
        const headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
        const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
        this.oNodeHeader.innerHTML = headerTemplateCompiled();
        this.oNodeContent.innerHTML = contentTemplateCompiled(
            {notiz: arrNotizen},
            {allowProtoPropertiesByDefault: true},
        );
        /* Radio Sortieren auf Checked setzen */
        const oNode = document.querySelector('input[name="sortieren"][value="' + this.sortierung + '"');
        oNode.checked = true;
        /* Klasse für Page Bezeichung ändern */
        this.oNodeHeader.classList.remove('page-detail');
        this.oNodeHeader.classList.add('page-index');
        this.oNodeContent.classList.remove('page-detail');
        this.oNodeContent.classList.add('page-index');
        this.oNodeFooter.classList.remove('page-detail');
        this.oNodeFooter.classList.add('page-index');
        /* Dom Selektion */
        const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
        const oNodeButtonChangeStyle = document.querySelector('.button-change-style');
        const oNodeButtonChangeSort = document.querySelector('.button-change-sort');
        const oNodeButtonFilterAbgeschlossen = document.querySelector('.button-zeige-abgeschlossen');
        const oNodeButtonEditNotiz = document.querySelectorAll('.button-notiz-edit');
        const oNodeButtonDeleteNotiz = document.querySelectorAll('.button-notiz-delete');
        const oNodeButtonFinishedNotiz = document.querySelectorAll('.notiz-status');
        /* Attributte und Klasse für Buttons ändern */
        if (this.filter === '') {
            oNodeButtonFilterAbgeschlossen.dataset.filterAbgeschlossen = 'ein';
            oNodeButtonFilterAbgeschlossen.classList.add('button-ist-aktiv');
        } else {
            oNodeButtonFilterAbgeschlossen.dataset.filterAbgeschlossen = 'aus';
            oNodeButtonFilterAbgeschlossen.classList.remove('button-ist-aktiv');
        }
        /* Eventlistener Registrieren */
        oNodeButtonNeueNotiz.addEventListener('click', (e) => this.refreshPage(e, 'detail'));
        oNodeButtonChangeStyle.addEventListener('change', (e) => this.changeStyle(e));
        oNodeButtonChangeSort.addEventListener('change', (e) => this.changeSort(e));
        oNodeButtonFilterAbgeschlossen.addEventListener('click', (e) => this.changeFilter(e));
        oNodeButtonFinishedNotiz.forEach((oNodeButton) => {
            oNodeButton.addEventListener('click', (e) => this.setAbgeschlossen(e));
        });
        oNodeButtonEditNotiz.forEach((oNodeButton) => {
            oNodeButton.addEventListener('click', (e) => this.refreshPage(e, 'detail'));
        });
        oNodeButtonDeleteNotiz.forEach((oNodeButton) => {
            oNodeButton.addEventListener('click', (e) => this.deleteDatensatz(e));
        });
    }

    /** Page Detail HTML Rendern */
    renderPageDetail(oNodeHeader,
                     oNodeContent,
                     oNodeFooter,
                     arrNotizen = []) {
        /* Parameter speichern */
        this.oNodeHeader = oNodeHeader;
        this.oNodeContent = oNodeContent;
        this.oNodeFooter = oNodeFooter;
        /* Aktuelle View löschen */
        this.oNodeHeader.textContent = '';
        this.oNodeContent.textContent = '';
        /* View Template laden und in DOM einsetzen */
        const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
        this.oNodeContent.innerHTML = contentTemplateCompiled(
            {notiz: arrNotizen},
            {allowProtoPropertiesByDefault: true},
        );
        /* Klasse für Page Bezeichung ändern */
        this.oNodeHeader.classList.remove('page-index');
        this.oNodeHeader.classList.add('page-detail');
        this.oNodeContent.classList.remove('page-index');
        this.oNodeContent.classList.add('page-detail');
        this.oNodeFooter.classList.remove('page-index');
        this.oNodeFooter.classList.add('page-detail');
        /* Dom Selektion */
        const oNodeButtonCancel = document.querySelector('.cancel');
        const oNodeButtonSpeichern = document.querySelector('.speichern');
        /* Eventlistener Registrieren */
        const oNodeButtonPrio = document.querySelectorAll('.prio-wert-setzen');
        oNodeButtonPrio.forEach((oNodeButton) => {
            oNodeButton.addEventListener('click', (e) => this.setPrioWert(e));
        });
        oNodeButtonCancel.addEventListener('click', (e) => this.refreshPage(e, 'index'));
        oNodeButtonSpeichern.addEventListener('click', (e) => this.saveDatensatz(e));
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
            const oNotiz = {sTitel: titel,
                            sBeschreibung: beschreibung,
                            iPrio: prio,
                            oDatumZuErledigenBis: datumZuErledigenBis};

            /** Pruefen ob es sich um ein Update oder einen neuen Datensatz handelt */
            if (e !== undefined
                && e.target.dataset.notizId !== undefined) {
                /* Update in Datenbank */
                this.oNotizService.saveDatensatz(oNotiz, e.target.dataset.notizId)
                .then(() => {
                    this.refreshPage(undefined,
                                     'index');
                })
                .catch(() => {
                    this.refreshPage(undefined,
                                     'index');
                });
            } else {
                /* Neu in Datenbank */
                this.oNotizService.saveDatensatz(oNotiz)
                .then(() => {
                    this.refreshPage(undefined,
                                     'index');
                })
                .catch(() => {
                    this.refreshPage(undefined,
                                     'index');
                });
            }
        }
    }

    /** Datensatz speichern */
    deleteDatensatz(e) {
        /* Response API abwarten */
        this.oNotizService.deleteDatensatz(e.target.dataset.notizId)
        .then(() => {
            this.refreshPage(undefined,
                             'index');
        })
        .catch(() => {
            this.refreshPage(undefined,
                             'index');
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
        this.sortierung = e.target.value;
        this.refreshPage(undefined, 'index');
    }

    /** Filtern der Liste der anzuzeigenden Datensätze */
    changeFilter(e) {
        /** Abgeschlossene Element ausblenden */
        if (e.target.dataset.filterAbgeschlossen === 'aus') {
            this.filter = '';
            this.refreshPage(undefined, 'index');
        /** Alle Emenete anzeigen */
        } else {
            this.filter = 'offen';
            this.refreshPage(undefined, 'index');
        }
    }

    /** Todo als abgeschlossen markieren */
    setAbgeschlossen(e) {
        /* Response API abwarten */
        this.oNotizService
        .getDatensatzById(e.target.dataset.notizId)
        .then((oNotizAlt) => {
            let oNotizNeu = null;
            if (oNotizAlt.bStatus === true) {
                oNotizNeu = {bStatus: false, oDatumAbgeschlossen: null};
            } else {
                oNotizNeu = {bStatus: true, oDatumAbgeschlossen: new Date()};
            }

            /* Update in Datenbank */
            this.oNotizService.saveDatensatz(oNotizNeu,
                                             e.target.dataset.notizId);
        })
        .then(() => {
            this.refreshPage(undefined,
                            'index');
        })
        .catch(() => {
            this.refreshPage(undefined,
                            'index');
        });
    }

    /** Wert Priorität setzen */
    setPrioWert(e) {
        this.oNodeContainerPrio = document.querySelector('.prio-container-status');
        this.oNodeContainerPrio.dataset.prioWert = e.target.dataset.prioWert;
        this.oNodePrioElemente = document.querySelectorAll('.prio-container-status img');
        this.oNodePrioElemente.forEach((oNode) => {
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
window.addEventListener('DOMContentLoaded', () => {
    /* Handelbar Helper: Vergleichen */
    Handlebars.registerHelper('xIf', (a, operator, b, opts) => {
        let bool = false;
        let retVal = null;
        switch (operator) {
           case '===':
                bool = a === b;
                break;
            case '!==':
                bool = a !== b;
                break;
           case '>':
               bool = a > b;
               break;
           case '<':
               bool = a < b;
               break;
           default:
               throw new Error('Unknown operator ');
        }
        if (bool) {
            retVal = opts.fn(this);
        } else {
            retVal = opts.inverse(this);
        }

        return retVal;
    });

    /* Handelbar Helper: Datumsformat Konvertieren */
    Handlebars.registerHelper('formatDate', (oDateIn, sFormat) => {
        const optionsView = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let sDateOut = null;
        if (oDateIn === undefined || oDateIn === null) {
            sDateOut = '';
        } else if (sFormat === 'mysql') {
            sDateOut = new Date(oDateIn).toISOString().slice(0, 10);
        } else {
            sDateOut = new Date(oDateIn).toLocaleString('de-DE', optionsView);
        }

        return sDateOut;
    });

    /* Instanzierung Controller */
    const oTodo = new TodoController();
    oTodo.refreshPage(undefined, 'index');
});
