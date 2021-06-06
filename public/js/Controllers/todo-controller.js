/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {
    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.oNotizService = new NotizService();
    }

    /** Public Methoden */
    renderPage(Page) {
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
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true},
            );
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

            oNodeButtonNeueNotiz.addEventListener('click', () => this.renderPage('detail'));
            oNodeButtonEditNotiz.forEach((oNode) => {
                oNode.addEventListener('click', () => this.renderPage('detail'));
            });
            oNodeButtonDeleteNotiz.forEach((oNode) => {
                oNode.addEventListener('click', (e) => this.deleteDatensatz(e));
            });

        /* PAGE: Detail */
        } else if (Page === 'detail') {
            /* View Template laden und in DOM einsetzen */
            const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
            oNodeContent.innerHTML = contentTemplateCompiled();
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



            oNodeButtonCancel.addEventListener('click', () => this.renderPage('index'));
            oNodeButtonSpeichern.addEventListener('click', () => this.saveDatensatz());
        }
    }

    /** Datensatz speichern */
    saveDatensatz() {
        let errMessages = [];
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
            /* Schreiben in Datenbank */
            const res = this.oNotizService
                        .saveDatensatz({sTitel: titel,
                                        sBeschreibung: beschreibung,
                                        iPrio: prio,
                                        oDatumZuErledigenBis: datumZuErledigenBis});

            /* View Template index neu laden */
            if (res === true) {
                this.renderPage('index');
            } else {
                console.log('unbekannter Fehler'); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }
        }
    }

    /** Datensatz speichern */
    deleteDatensatz(e) {
        const res = this.oNotizService.deleteDatensatz(e.target.dataset.notizId);
        if (res === true) {
            this.renderPage('index');
        }
    }
}

/* Instanzierung Controller */
const oTodo = new TodoController();
oTodo.renderPage('index');
