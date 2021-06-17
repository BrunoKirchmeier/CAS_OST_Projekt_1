import { oNotizenStore } from '../services/notizenStore.js';

/* Controller Todo */
export class notizenController {

    /** Private Eigenschaften */
    #filter

    /** Konstruktor */
    constructor() {}

     /** Alle Datensätze laden */
    async getDatensaetze(req, res) {
        res.json(await oNotizenStore.getNotizen(undefined,
                                                req.query.sortingTyp,
                                                req.query.filterTyp));
    }

    /** Datensatz nach Id laden */
    async getDatensatzById(req, res) {
        res.json(await oNotizenStore.getNotizen(req.params.id));
    }

    /** Neuer Datensatz in DB einfügen */
    async insertDatensatz(req, res) {
        const oNotiz = {sTitel: req.body.sTitel || '',
                        sBeschreibung: req.body.sBeschreibung || '',
                        iPrio: req.body.iPrio || 1,
                        oDatumZuErledigenBis: new Date(req.body.oDatumZuErledigenBis).toISOString() || null,
                        oDatumAbgeschlossen: null,
                        oDatumErstellt: new Date().toISOString(),
                        bStatus: false};

        res.json(await oNotizenStore.insertDatensatz(oNotiz));
    }

    /** Datensatz löschen */
    async deleteDatensatz(req, res) {
        res.json(await oNotizenStore.deleteDatensatz(req.params.id));
    }

    /** Datensatz in DB aktualisieren */
    async updateDatensatz(req, res) {

        if(req.body.hasOwnProperty('oDatumErstellt') === true) {
            req.body.oDatumErstellt = new Date(req.body.oDatumErstellt).toISOString();
        }

        if(req.body.hasOwnProperty('oDatumZuErledigenBis') === true) {
            req.body.oDatumZuErledigenBis = new Date(req.body.oDatumZuErledigenBis).toISOString();
        }

        if(req.body.hasOwnProperty('oDatumAbgeschlossen') === true) {
            req.body.oDatumAbgeschlossen = new Date(req.body.oDatumAbgeschlossen).toISOString();
        }

        res.json(await oNotizenStore.updateDatensatz(req.params.id,
                                                     req.body));
    }

}

export const oNotizenController = new notizenController();