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
    renderPage(event) {
        /* Allgemeine DOM Selektoren */
        let oNodeHeader = document.querySelector('.header');
        let oNodeContent = document.querySelector('.content');
        let oNodeFooter = document.querySelector('.footer');
        let headerTemplateCompiled = null;
        let contentTemplateCompiled = null;
        /* PAGE: Index */
        if (event === undefined
            || event.target.dataset.changeToPage === 'index') {
            /* Aktuelle Ansicht löschen */
            oNodeHeader.innerHtml = '';
            oNodeContent.innerHtml = '';
            /* View Template laden und in DOM einsetzen */
            headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
            contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
            oNodeHeader.innerHTML = headerTemplateCompiled();
            oNodeContent.innerHTML = contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true}
            );
            // window.addEventListener('DOMContentLoaded', (event) => {
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
                let oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
                let oNodeButtonEditNotiz = document.querySelector('.button-notiz-edit');
                oNodeButtonNeueNotiz.addEventListener('click', this.renderPage);
                oNodeButtonEditNotiz.addEventListener('click', this.renderPage);
                // oNodeButtonNeueNotiz.addEventListener('click', () => { this.renderPage(); });
                // oNodeButtonEditNotiz.addEventListener('click', () => { this.renderPage(); });
                // oNodeButtonNeueNotiz.addEventListener('click', this.renderPage.bind(this));
                // oNodeButtonEditNotiz.addEventListener('click', this.renderPage.bind(this));
            // });
        /* PAGE: Detail */
        } else if (event.target.dataset.changeToPage === 'detail') {
            /* Aktuelle Ansicht löschen */
            oNodeHeader.innerHtml = '';
            oNodeContent.innerHtml = '';
            /* View Template laden und in DOM einsetzen */
            contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
            oNodeContent.innerHTML = contentTemplateCompiled();
            /* Klasse für Page Bezeichung ändern */
            // window.addEventListener('DOMContentLoaded', (event) => {
                oNodeHeader = document.querySelector('.header');
                oNodeContent = document.querySelector('.content');
                oNodeFooter = document.querySelector('.footer');

                oNodeHeader.classList.remove('page-index');
                oNodeHeader.classList.add('page-detail');
                oNodeContent.classList.remove('page-index');
                oNodeContent.classList.add('page-detail');
                oNodeFooter.classList.remove('page-index');
                oNodeFooter.classList.add('page-detail');
                /* Eventlistener Registrieren */
                let oNodeButtonCancel = document.querySelector('.cancel');
                oNodeButtonCancel.addEventListener('click', this.renderPage);
                // oNodeButtonNeueNotiz.addEventListener('click', () => { this.renderPage(); });
                // oNodeButtonCancel.addEventListener('click', this.renderPage.bind(this));
            //  });
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
oTodo.renderPage();