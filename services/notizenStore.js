import Datastore from 'nedb-promises';

class notizenDatastore {

    /** Private Eigenschaften */
    #db;
    #daten;

    /** Konstruktor */
    constructor(_db) {
        this.#db = _db || new Datastore({filename: './data/notizen.db', autoload: true});
        this.#daten = [];
    }

    async getNotizen(_id = undefined,
                     _sortierung = 'erledigt',
                     _filter = 'offen') {

        /** Sortier Variante - Datenbankfeld bestimmen */ 
        if (_sortierung === 'erledigt') {
            _sortierung = 'oDatumZuErledigenBis';
        } else if (_sortierung === 'erstellt') {
            _sortierung = 'oDatumErstellt';
        } else if (_sortierung === 'prio') {
            _sortierung = 'iPrio';
        }

        /** Sortier Richtung */ 
        const sortierRichtung = _sortierung === 'oDatumZuErledigenBis'
                                || _sortierung === 'oDatumErstellt'
                              ? -1
                              : 1;
        /** Filter */
        const filter = _filter === 'offen'
                     ? { bStatus: { $ne: true }}
                     : {};

        /** Alle Datensätze */ 
        if (_id === undefined) {
            this.#daten = await this.#db.find(filter).sort({ _sortierung: sortierRichtung });

        /** Datensatz nach ID */
        } else {
            this.#daten = await this.#db.findOne({ _id: _id });
        }
        return this.#daten;
    }

    async insertDatensatz(_oNotiz) {
        this.#daten = await this.#db.insert(_oNotiz);
        return this.#daten;
    }

    async updateDatensatz(_id,
                          _oNotiz) {
        this.#daten = await this.#db.update({ _id: _id },
                                            { $set: _oNotiz});
        return this.#daten;
    }

    async deleteDatensatz(_id) {
        this.#daten = await this.#db.remove({ _id: _id });
        return this.#daten;
    }
}

export const oNotizenStore = new notizenDatastore();
