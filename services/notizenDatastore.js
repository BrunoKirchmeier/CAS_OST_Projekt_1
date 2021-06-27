import Datastore from 'nedb-promises';

class NotizenDatastore {
    /** Konstruktor */
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notizen.db', autoload: true});
        this.daten = [];
        this.sortierung = 'erledigt';
        this.sortierRichtung = 1;
        this.filter = {};
    }

    async getNotizen(id = undefined,
                     sortierung = 'erledigt',
                     filter = 'offen') {
        /** Sortier Variante - Datenbankfeld bestimmen */
        if (sortierung === 'erledigt') {
            this.sortierung = 'oDatumZuErledigenBis';
        } else if (sortierung === 'erstellt') {
            this.sortierung = 'oDatumErstellt';
        } else if (sortierung === 'prio') {
            this.sortierung = 'iPrio';
        }

        /** Sortier Richtung */
        this.sortierRichtung = this.sortierung === 'oDatumZuErledigenBis'
                               || this.sortierung === 'oDatumErstellt'
                              ? 1
                              : -1;

        /** Filter */
        this.filter = filter === 'offen'
                     ? { bStatus: { $ne: true }}
                     : {};

        /** Alle Datensätze */
        if (id === undefined) {
            const oArgument = {};
            oArgument[this.sortierung] = this.sortierRichtung;
            this.daten = await this.db.find(this.filter).sort(oArgument);

        /** Datensatz nach ID */
        } else {
            this.daten = await this.db.findOne({ _id: id });
        }
        return this.daten;
    }

    async insertDatensatz(oNotiz) {
        this.daten = await this.db.insert(oNotiz);
        return this.daten;
    }

    async updateDatensatz(id,
                          oNotiz) {
        this.daten = await this.db.update({ _id: id },
                                          { $set: oNotiz});
        return this.daten;
    }

    async deleteDatensatz(id) {
        this.daten = await this.db.remove({ _id: id });
        return this.daten;
    }
}

const oNotizenDatastore = new NotizenDatastore();
export default oNotizenDatastore;
