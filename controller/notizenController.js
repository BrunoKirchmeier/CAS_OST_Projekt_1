import oNotizenDatastore from '../services/notizenDatastore.js';

/* Controller Todo */
export class NotizenController {
        /** Konstruktor */
        constructor() {
            this.req = null;
        }

     /** Alle Datensätze laden */
    async getDatensaetze(req, res) {
        this.req = req;
        res.json(await oNotizenDatastore.getNotizen(undefined,
                                                    this.req.query.sortingTyp,
                                                    this.req.query.filterTyp));
    }

    /** Datensatz nach Id laden */
    async getDatensatzById(req, res) {
        this.req = req;
        res.json(await oNotizenDatastore.getNotizen(this.req.params.id));
    }

    /** Neuer Datensatz in DB einfügen */
    async insertDatensatz(req, res) {
        this.req = req;
        const oNotiz = {sTitel: this.req.body.sTitel || '',
                        sBeschreibung: this.req.body.sBeschreibung || '',
                        iPrio: this.req.body.iPrio || 1,
                        oDatumZuErledigenBis: new Date(this.req.body.oDatumZuErledigenBis)
                                                  .toISOString() || null,
                        oDatumAbgeschlossen: null,
                        oDatumErstellt: new Date().toISOString(),
                        bStatus: false};

        res.json(await oNotizenDatastore.insertDatensatz(oNotiz));
    }

    /** Datensatz löschen */
    async deleteDatensatz(req, res) {
        this.req = req;
        res.json(await oNotizenDatastore.deleteDatensatz(this.req.params.id));
    }

    /** Datensatz in DB aktualisieren */
    async updateDatensatz(req, res) {
        this.req = req;
        if (this.req.body.oDatumErstellt !== undefined) {
            this.req.body.oDatumErstellt = new Date(req.body.oDatumErstellt).toISOString();
        }

        if (this.req.body.oDatumZuErledigenBis !== undefined) {
            this.req.body.oDatumZuErledigenBis = new Date(req.body.oDatumZuErledigenBis)
                                                     .toISOString();
        }

        if (this.req.body.oDatumAbgeschlossen !== undefined) {
            this.req.body.oDatumAbgeschlossen = new Date(req.body.oDatumAbgeschlossen)
                                                    .toISOString();
        }

        res.json(await oNotizenDatastore.updateDatensatz(this.req.params.id,
                                                         this.req.body));
    }
}

const oNotizenController = new NotizenController();
export default oNotizenController;
