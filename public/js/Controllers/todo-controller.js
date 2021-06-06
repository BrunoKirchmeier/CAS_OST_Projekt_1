/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {

    /** Private Eigenschaften */
    #sortierung;
    #filter;

    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.oNotizService = new NotizService();
        this.#sortierung = 'erledigt';
        this.#filter = 'offen';
    }

    /** Public Methoden */
    renderPage(e1, Page) {
        /* Aktuelle Ansicht löschen */
        const oNodeHeader = document.querySelector('.header');
        const oNodeContent = document.querySelector('.content');
        const oNodeFooter = document.querySelector('.footer');
        oNodeHeader.textContent = '';
        oNodeContent.textContent = '';

        /* PAGE: Index */
        if (Page === 'index') {
            /* View Template laden und in DOM einsetzen */
            const headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
            const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
            oNodeHeader.innerHTML = headerTemplateCompiled();
            oNodeContent.innerHTML = contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze(this.#sortierung, this.#filter)},
                {allowProtoPropertiesByDefault: true},
            );
            /* Radion Sortieren auf Checked setzen */
            const oNode = document.querySelector('input[name="sortieren"][value="' + this.#sortierung + '"');
            oNode.checked = true;
            /* Klasse für Page Bezeichung ändern */
            oNodeHeader.classList.remove('page-detail');
            oNodeHeader.classList.add('page-index');
            oNodeContent.classList.remove('page-detail');
            oNodeContent.classList.add('page-index');
            oNodeFooter.classList.remove('page-detail');
            oNodeFooter.classList.add('page-index');
            /* Eventlistener Registrieren */
            const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
            const oNodeButtonChangeStyle = document.querySelector('.button-change-style');
            const oNodeButtonChangeSort = document.querySelector('.button-change-sort');
            const oNodeButtonFilterAbgeschlossen = document.querySelector('.button-zeige-abgeschlossen');
            const oNodeButtonEditNotiz = document.querySelectorAll('.button-notiz-edit');
            const oNodeButtonDeleteNotiz = document.querySelectorAll('.button-notiz-delete');
            const oNodeButtonFinishedNotiz = document.querySelectorAll('.notiz-status');

            oNodeButtonNeueNotiz.addEventListener('click', (e2) => this.renderPage(e2, 'detail'));
            oNodeButtonChangeStyle.addEventListener('change', (e2) => this.changeStyle(e2));
            oNodeButtonChangeSort.addEventListener('change', (e2) => this.changeSort(e2));
            oNodeButtonFilterAbgeschlossen.addEventListener('click', (e2) => this.changeFilter(e2));

            oNodeButtonFinishedNotiz.forEach((oNode) => {
                oNode.addEventListener('click', (e2) => this.setAbgeschlossen(e2));
            });

            oNodeButtonEditNotiz.forEach((oNode) => {
                oNode.addEventListener('click', (e2) => this.renderPage(e2, 'detail'));
            });
            oNodeButtonDeleteNotiz.forEach((oNode) => {
                oNode.addEventListener('click', (e2) => this.deleteDatensatz(e2));
            });

        /* PAGE: Detail */
        } else if (Page === 'detail') {
            /* View Template laden und in DOM einsetzen */
            const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
            if (e1 !== undefined
                && e1.target.dataset.notizId !== undefined) {
                    oNodeContent.innerHTML = contentTemplateCompiled(
                        {notiz: this.oNotizService.getDatensatzById(e1.target.dataset.notizId)},
                        {allowProtoPropertiesByDefault: true},
                    );
            } else {
                oNodeContent.innerHTML = contentTemplateCompiled();
            }
            /* Klasse für Page Bezeichung ändern */
            oNodeHeader.classList.remove('page-index');
            oNodeHeader.classList.add('page-detail');
            oNodeContent.classList.remove('page-index');
            oNodeContent.classList.add('page-detail');
            oNodeFooter.classList.remove('page-index');
            oNodeFooter.classList.add('page-detail');
            /* Eventlistener Registrieren */
            const oNodeButtonCancel = document.querySelector('.cancel');
            const oNodeButtonSpeichern = document.querySelector('.speichern');
            const oNodeButtonPrio = document.querySelectorAll('.prio-container-status');



            oNodeButtonCancel.addEventListener('click', (e2) => this.renderPage(e2, 'index'));
            oNodeButtonSpeichern.addEventListener('click', (e2) => this.saveDatensatz(e2));
        }
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

        /** Feld: Erledigen bis */
        oNode = document.querySelector('.datum-input');
        if (oNode === null
            || typeof (oNode.value) !== 'string'
            || Number.isNaN(Date.parse(oNode.value)) === true) {
                errMessages.push({message: 'Feld Erledigt bis ist kein gültiges Datumsfeld'});
        } else {
            datumZuErledigenBis = oNode.value;
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
                && e.target.dataset.notizId !== undefined
                && e.target.dataset.notizId > 0) {
                /* Update in Datenbank */
                res = this.oNotizService.saveDatensatz(oNotiz, e.target.dataset.notizId);
            } else {
                /* Neu in Datenbank */
                res = this.oNotizService.saveDatensatz(oNotiz);
            }
            /* View Template index neu laden */
            if (res === true) {
                this.renderPage(undefined, 'index');
            }
        }
    }

    /** Datensatz speichern */
    deleteDatensatz(e) {
        const res = this.oNotizService.deleteDatensatz(e.target.dataset.notizId);
        if (res === true) {
            this.renderPage(undefined, 'index');
        }
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
        this.renderPage(undefined, 'index');
    }

    /** Filtern der Liste der anzuzeigenden Datensätze */
    changeFilter(e) {
        /** Abgeschlossene Element ausblenden */
        if(e.target.dataset.filterAbgeschlossen === 'aus') {
            e.target.dataset.filterAbgeschlossen = 'ein';
            e.target.classList.add('button-ist-aktiv');
            console
            this.#filter = '';
            this.renderPage(undefined, 'index');

        /** Alle Emenete anzeigen */
        } else {
            e.target.dataset.filterAbgeschlossen = 'aus';
            e.target.classList.remove('button-ist-aktiv');
            this.#filter = 'offen';
            this.renderPage(undefined, 'index');
        }
    }

    /** Todo als abgeschlossen markieren */
    setAbgeschlossen (e) {
        const datensatz = this.oNotizService.getDatensatzById(e.target.dataset.notizId);
        const oNotiz = datensatz.bStatus === true ? {bStatus: false} : {bStatus: true};
        const res = this.oNotizService.saveDatensatz(oNotiz, e.target.dataset.notizId);
    }

}

/* Instanzierung Controller */
const oTodo = new TodoController();
oTodo.renderPage(undefined, 'index');
