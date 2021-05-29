/* Modul Importe */
import {NotizService} from '../services/notiz-service.js';

/* Controller Todo */
class TodoController {

    /** Private Eigenschaften */
    #oNotizService;
    #notizListeContentTemplate;
    #oNodeNotizListeContent;
    #oNodeNotizById;
    #oNodeButtonNeueNotiz;
    #oNodeButtonSortieren;
    #oNodeButtonFilter;
    #oNodeButtonStyle;
    #oNodeBodyContainer;
    
    /** Private Methoden */

    constructor() {
        /** Klasse instanzieren */
        this.#oNotizService = new NotizService();

        /** Handelbar Startseite Referenzieren */
        this.#notizListeContentTemplate = Handlebars.compile(document.querySelector('.notiz-liste-template').innerHTML);
        
        /** DOM Referenzen laden */
        /*
        this.#oNodeBodyContainer = document.querySelector('.container');
        this.#oNodeNotizListeContent = document.querySelector('.content');
        this.#oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
        this.#oNodeButtonSortieren = document.querySelector('.header-row-2-col-1');
        this.#oNodeButtonFilter = document.querySelector('.button-zeige-abgeschlossen');
        this.#oNodeButtonStyle = document.querySelector('.header-row-1-col-3');
        */
    }

    detailansichtNotiz(e) {
        /** DOM Referenzen laden */
        console.log(this.#oNodeBodyContainer.innerHTML());
    }

    zeigeNotizen() {
        this.#oNodeNotizListeContent.innerHTML = this.#notizListeContentTemplate(
             {notiz: this.#oNotizService.getDatensaetze()},
             {allowProtoPropertiesByDefault: true});
    }

    initEventHandlers() {
        /** Event Listener */
        /*
        this.#oNodeButtonNeueNotiz.addEventListener('click', this.detailansichtNotiz);
        this.#oNodeNotizListeContent.addEventListener('click', this.detailansichtNotiz);
        this.#oNodeButtonSortieren.addEventListener('click', this.changeSort);
        this.#oNodeButtonFilter.addEventListener('click', this.changeFilter);
        this.#oNodeButtonStyle.addEventListener('click', this.changeStyle);
        */
    }

    init() {
        this.zeigeNotizen();
        // this.initEventHandlers();
    }
}

/* DOM Referenzen laden */        
const oNodeBodyContainer = document.querySelector('.container');
const oNodeNotizListeContent = document.querySelector('.content');
const oNodeButtonEditNotiz = document.querySelector('.button-notiz-edit');
const oNodeButtonNeueNotiz = document.querySelector('.button-notiz-neu');
const oNodeButtonSortieren = document.querySelector('.header-row-2-col-1');
const oNodeButtonFilter = document.querySelector('.button-zeige-abgeschlossen');
const oNodeButtonStyle = document.querySelector('.header-row-1-col-3');

/* Controller Instanzieren und initialisieren */
const oTodo = new TodoController();
oTodo.init();

/** Event Listener Registieren */
oNodeButtonNeueNotiz.addEventListener('click', oTodo.detailansichtNotiz);
oNodeButtonEditNotiz.addEventListener('click', oTodo.detailansichtNotiz);
oNodeButtonSortieren.addEventListener('click', oTodo.changeSort);
oNodeButtonFilter.addEventListener('click', oTodo.changeFilter);
oNodeButtonStyle.addEventListener('click', oTodo.changeStyle);
