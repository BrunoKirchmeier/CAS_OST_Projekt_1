/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {

    /** Private Eigenschaften */
    #oNotizService;
    
    /** Private Methoden */

    constructor() {
        /** Klasse instanzieren */
        this.#oNotizService = new NotizService();
    }

    detailansichtNotiz(e) {
        /** DOM Referenzen laden */
        const oNodeBody = document.querySelector('.page-detail .container');

        /** Aktuelle Darstellung löschen und neue Ansicht laden */
        // const templateCompiled = Handlebars.compile(document.querySelector('.notiz-liste-template').innerHTML);
        // oNodeBody.textContent = '';




        console.log(e);
    }

    zeigeNotizen() {

console.log(document.querySelector('.page-index .notiz-liste-content-template')); return;
/*
        const templateCompiled = Handlebars.compile(document.querySelector('.page-index .notiz-liste-content-template').innerHTML);
        const oNode = document.querySelector('.page-index .content');
        oNode.innerHTML = templateCompiled(
             {notiz: this.#oNotizService.getDatensaetze()},
             {allowProtoPropertiesByDefault: true}); */
    }

    init() {
        // this.zeigeNotizen();
    }
}

/* Controller Instanzieren und initialisieren */
const oTodo = new TodoController();
oTodo.init();

/* DOM Referenzen laden */
const oNodeButtonEditNotiz = document.querySelector('.button-notiz-edit');
const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
const oNodeButtonSortieren = document.querySelector('.page-index .header-row-2-col-1');
const oNodeButtonFilter = document.querySelector('.button-zeige-abgeschlossen');
const oNodeButtonStyle = document.querySelector('.page-index .header-row-1-col-3');

/** Event Listener Registieren */
oNodeButtonNeueNotiz.addEventListener('click', oTodo.detailansichtNotiz);
oNodeButtonEditNotiz.addEventListener('click', oTodo.detailansichtNotiz);
oNodeButtonSortieren.addEventListener('click', oTodo.changeSort);
oNodeButtonFilter.addEventListener('click', oTodo.changeFilter);
oNodeButtonStyle.addEventListener('click', oTodo.changeStyle);