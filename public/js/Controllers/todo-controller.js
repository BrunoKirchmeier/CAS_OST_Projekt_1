/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {
    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.oNotizService = new NotizService();
        /** DOM Elemente laden zu Index Page */
        this.oNodeHeader = document.querySelector('.header');
        this.oNodeContent = document.querySelector('.content');
        /** Templates laden zu Index Page */
        this.headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
        this.contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
    }

    /** Public Methoden */

    /** Datensatz speichern */
    saveDatensatz(event) {
    }

    /** VIEW RENDERING: Ausgabe Page Index */
    zeigePage(event) {
        if (event != null) {
            // console.log(event.target.dataset.changeToPage);
        }

        /** Header aufbereiten und Rendern */
        this.oNodeHeader.innerHTML = this.headerTemplateCompiled();

        /** Content aufbereiten und Rendern */
        this.oNodeContent.innerHTML = this.contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true});

        if (event != null) {
            this.initEventHandlers();
        } else {
            this.initEventHandlers(null);
        }
    }



    /** VIEW RENDERING: Ausgabe Page Index */
    zeigePageIndex(event) {
        if (event != null) {
            // console.log(event.target.dataset.changeToPage);
        }

        /** Header aufbereiten und Rendern */
        this.oNodeHeader.innerHTML = this.headerTemplateCompiled();

        /** Content aufbereiten und Rendern */
        this.oNodeContent.innerHTML = this.contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true});

        if (event != null) {
            this.initEventHandlers();
        } else {
            this.initEventHandlers(null);
        }
    }

    /** VIEW RENDERING: Ausgabe Page detail */
    zeigePageDetail(event) {
        /** Header aufbereiten und Rendern */
        this.oNodeHeader = document.querySelector('.header');
        this.oNodeHeader.innerHTML = '';

        /** Content aufbereiten und Rendern */
        this.oNodeContent = document.querySelector('.content');
        this.contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
        this.oNodeContent.innerHTML = this.contentTemplateCompiled(
                {notiz: this.oNotizService.getDatensaetze()},
                {allowProtoPropertiesByDefault: true});

        if(event != null) {
            this.initEventHandlers();
        } else {
            this.initEventHandlers(null);
        }
    }

    /** VIEW RENDERING: Eventlistener Registrieren */
    initEventHandlers(event) {
        /** Instanzierung Objekt */
        if (event == null) {
            /** DOM Elemente laden */
            const oNodeButtonEditNotiz = document.querySelector('.button-notiz-edit');
            const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
            const oNodeButtonSortieren = document.querySelector('.header-row-2-col-1');
            const oNodeButtonFilter = document.querySelector('.button-zeige-abgeschlossen');
            const oNodeButtonStyle = document.querySelector('.header-row-1-col-3');
            /** Eventlistener Registrieren */
            oNodeButtonNeueNotiz.addEventListener('click', this.zeigePageDetail);
            oNodeButtonEditNotiz.addEventListener('click', this.zeigePageDetail);
            /*
            oNodeButtonSortieren.addEventListener('click', this.changeSort);
            oNodeButtonFilter.addEventListener('click', this.changeFilter);
            oNodeButtonStyle.addEventListener('click', this.changeStyle);
            */

        /** Event Aufruf */
        } else {
        }
    }

    init() {
        /** Initialseite laden */
        this.zeigePageIndex(null);
    }
}

/* Instanzierung Controller */
const oTodo = new TodoController();
oTodo.init();
