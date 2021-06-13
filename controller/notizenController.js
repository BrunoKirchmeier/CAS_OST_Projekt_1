import { oNotizenStore } from '../services/notizenStore.js';

/* Controller Todo */
export class notizenController {

    /** Private Eigenschaften */
    #filter

    /** Konstruktor */
    constructor() {}

     /** Alle Datensätze laden */
    async getDatensaetze(req, res) {
        console.log(req.query);
        res.json(await oNotizenStore.getNotizen());
    }

    /** Datensatz nach Id laden */
    async getDatensatzById(req, res) {
        res.json(await oNotizenStore.getNotizen(req.params.id));
    }

    /** Neuer Datensatz in DB einfügen */
    async insertDatensatz(req, res) {
        const oNotiz = {sTitel: req.body.sTitel || '',
                        sBeschreibung: req.body.sBeschreibung || '',
                        iPrio: req.body.iPrio || 5,
                        oDatumZuErledigenBis: req.body.oDatumZuErledigenBis || new Date(),
                        oDatumAbgeschlossen: null,
                        oDatumErstellt: new Date(),
                        bStatus: false};

        res.json(await oNotizenStore.insertDatensatz(oNotiz));
    }

    /** Datensatz löschen */
    async deleteDatensatz(req, res) {
        res.json(await oNotizenStore.deleteDatensatz(req.params.id));
    }

    /** Datensatz in DB aktualisieren */
    async updateDatensatz(req, res) {
        res.json(await oNotizenStore.updateDatensatz(req.params.id,
                                                     req.body));
    }


}

export const oNotizenController = new notizenController();