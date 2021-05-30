/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {

    /** Private Eigenschaften */
    #oNotizService;

    /** Private Methoden */



    /** Konstruktor */
    constructor() {
        /** Model instanzieren */
        this.#oNotizService = new NotizService();
    }



    /** Public Methoden */

    /** Datensatz speichern */
    getDatensaetze(event) {
        return this.#oNotizService.getDatensaetze();
    }

    /** Datensatz speichern */
    saveDatensatz(event) {
    }







}

/* Instanzierung Controller */
const oTodo = new TodoController();

/* Statische DOM Referenzen laden */
let oNodeBody = document.querySelector('.body-container');
let oNodeHeader = document.querySelector('.header');
let oNodeContent = document.querySelector('.content');
let oNodeFooter = document.querySelector('.footer');

/* Index Seite initial laden */
let headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
let contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);

oNodeHeader.innerHTML = headerTemplateCompiled();
oNodeContent.innerHTML = contentTemplateCompiled(
        {notiz: oTodo.getDatensaetze()},
        {allowProtoPropertiesByDefault: true});

/* Dynamische DOM Referenzen nach View Rendering laden */
const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
const oNodeButtonSortieren = document.querySelector('.header-row-2-col-1');
const oNodeButtonFilter = document.querySelector('.button-zeige-abgeschlossen');
const oNodeButtonStyle = document.querySelector('.header-row-1-col-3');
const oNodeButtonEditNotiz = document.querySelector('.button-notiz-edit');

/** Event Listener Registieren */
oNodeButtonNeueNotiz.addEventListener('click', function(){
    /* View detail Rendern */
    oNodeHeader.textContent = '';
    oNodeContent.textContent = '';
    contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-detail.notiz-detail-template').innerHTML);
    oNodeContent.innerHTML = contentTemplateCompiled();
    /* Klasse für Page Bezeichung ändern */
    oNodeHeader.classList.remove('page-index');
    oNodeHeader.classList.add('page-detail');
    oNodeContent.classList.remove('page-index');
    oNodeContent.classList.add('page-detail');
    oNodeFooter.classList.remove('page-index');
    oNodeFooter.classList.add('page-detail');
    /* Neue Eventlistener Registrieren für Page detail */
    const oNodeButtonSaveNotiz = document.querySelector('.speichern');
    oNodeButtonSaveNotiz.addEventListener('click', oTodo.saveDatensatz);
    const oNodeButtonCancel = document.querySelector('.cancel');

    /* Eventlistener für Wechsel zu Page Index */
    oNodeButtonCancel.addEventListener('click', function(){
        /* View Index Rendern */
        oNodeHeader.textContent = '';
        oNodeContent.textContent = '';
        headerTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-header-template').innerHTML);
        contentTemplateCompiled = Handlebars.compile(document.querySelector('.page-index.notiz-liste-content-template').innerHTML);
        oNodeHeader.innerHTML = headerTemplateCompiled();
        oNodeContent.innerHTML = contentTemplateCompiled(
            {notiz: oTodo.getDatensaetze()},
            {allowProtoPropertiesByDefault: true});
        /* Klasse für Page Bezeichung ändern */
        oNodeHeader.classList.remove('page-detail');
        oNodeHeader.classList.add('page-index');
        oNodeContent.classList.remove('page-detail');
        oNodeContent.classList.add('page-index');
        oNodeFooter.classList.remove('page-detail');
        oNodeFooter.classList.add('page-index');

    });

});


/*
oNodeButtonEditNotiz.addEventListener('click', oTodo.zeigePageDetail);
oNodeButtonSortieren.addEventListener('click', oTodo.changeSort);
oNodeButtonFilter.addEventListener('click', oTodo.changeFilter);
oNodeButtonStyle.addEventListener('click', oTodo.changeStyle);
*/
