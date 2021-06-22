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
        try {
            res.status(200)
            .json(await oNotizenDatastore.getNotizen(undefined,
                                                     this.req.query.sortingTyp,
                                                     this.req.query.filterTyp));
        } catch (err) {
            res.status(400)
            .json(err.message);
        }
    }

    /** Datensatz nach Id laden */
    async getDatensatzById(req, res) {
        this.req = req;
        try {
            res.status(200)
            .json(await oNotizenDatastore.getNotizen(this.req.params.id));
        } catch (err) {
            res.status(400)
            .json(err.message);
        }
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
        try {
            res.status(201)
            .json(await oNotizenDatastore.insertDatensatz(oNotiz));
        } catch (err) {
            res.status(400)
            .json(err.message);
        }
    }

    /** Datensatz löschen */
    async deleteDatensatz(req, res) {
        this.req = req;
        try {
            const result = await oNotizenDatastore.deleteDatensatz(this.req.params.id);

            if (result === 0) {
                res.status(400)
                .end();
            } else {
                res.status(200)
                .end();
            }
        } catch (err) {
            res.status(400)
            .json(err.message);
        }
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

        try {
            const result = await oNotizenDatastore.updateDatensatz(this.req.params.id,
                                                                   this.req.body);
            if (result === 0) {
                res.status(400)
                .end();
            } else {
                res.status(200)
                .json(await oNotizenDatastore.getNotizen(this.req.params.id));
            }
        } catch (err) {
            res.status(400)
            .json(err.message);
        }
    }
}

const oNotizenController = new NotizenController();
export default oNotizenController;
