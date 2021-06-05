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
    renderPage(changeToPage) {
        /* Aktuelle Ansicht löschen */
        let oNodeHeader = document.querySelector('.header');
        let oNodeContent = document.querySelector('.content');
        let oNodeFooter = document.querySelector('.footer');
        oNodeHeader.textContent = '';
        oNodeContent.textContent = '';
        /* PAGE: Index */
        if (changeToPage === 'index') {
            /* View Template laden und in DOM einsetzen */
            const headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
            const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
            oNodeHeader.innerHTML = headerTemplateCompiled();
            oNodeContent.innerHTML = contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true}
            );
            /* Neues DOM laden */
            oNodeHeader = document.querySelector('.header');
            oNodeContent = document.querySelector('.content');
            oNodeFooter = document.querySelector('.footer');
            /* Klasse für Page Bezeichung ändern */
            oNodeHeader.classList.remove('page-detail');
            oNodeHeader.classList.add('page-index');
            oNodeContent.classList.remove('page-detail');
            oNodeContent.classList.add('page-index');
            oNodeFooter.classList.remove('page-detail');
            oNodeFooter.classList.add('page-index');
            /* Eventlistener Registrieren */
            const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
            const oNodeButtonEditNotiz = document.querySelectorAll('.button-notiz-edit');
            oNodeButtonNeueNotiz.addEventListener('click', () => this.renderPage('detail'));
            oNodeButtonEditNotiz.forEach((oNode) => {
                oNode.addEventListener('click', () => this.renderPage('detail'));
            });
        /* PAGE: Detail */
        } else if (changeToPage === 'detail') {
            /* View Template laden und in DOM einsetzen */
            const contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
            oNodeContent.innerHTML = contentTemplateCompiled();
            /* DOM laden */
            oNodeHeader = document.querySelector('.header');
            oNodeContent = document.querySelector('.content');
            oNodeFooter = document.querySelector('.footer');
            /* Klasse für Page Bezeichung ändern */
            oNodeHeader.classList.remove('page-index');
            oNodeHeader.classList.add('page-detail');
            oNodeContent.classList.remove('page-index');
            oNodeContent.classList.add('page-detail');
            oNodeFooter.classList.remove('page-index');
            oNodeFooter.classList.add('page-detail');
            /* Eventlistener Registrieren */
            const oNodeButtonCancel = document.querySelector('.cancel');
            oNodeButtonCancel.addEventListener('click', () => this.renderPage('index'));
        }
    }

    /** Datensatz speichern */
    saveDatensatz() {
    }

    /** Datensatz speichern */
    getDatensaetze() {
        return this.oNotizService.getDatensaetze();
    }
}

/* Instanzierung Controller */
const oTodo = new TodoController();
oTodo.renderPage('index');
