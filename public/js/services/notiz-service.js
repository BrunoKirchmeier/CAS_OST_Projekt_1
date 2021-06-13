/* Modul Importe */
import HttpService from './http-service.js'

/* Model Notiz */
export default class NotizService {
    /** Konstruktor */
    constructor() {
        this.httpService = new HttpService();
        this.response = null;
    }

    /* Datensatz anhand Id zurueckgeben */
    async getDatensatzById(_iId) {
        this.response = await this.httpService.ajax('GET', `/api/notizen/${_iId}`);
        return this.response;
    }

    /* Datensaetze zurueckgeben */
    async getDatensaetze(_sortingTyp = 'erledigt',
                         _filterTyp = '') {
        const query = `?sortingTyp=${_sortingTyp}&filterTyp=${_filterTyp}`;
        this.response = await this.httpService.ajax('GET', `/api/notizen/${query}`);
        return this.response;
    }

    /* Datensatz speichern */
    async saveDatensatz(_oNotiz, _iId) {
        /* Datensatz Neu */
        if (_iId === undefined
            || _iId === null
            || _iId === '') {
            const oNotiz = {sTitel: _oNotiz.sTitel,
                            sBeschreibung: _oNotiz.sBeschreibung,
                            iPrio: _oNotiz.iPrio,
                            oDatumZuErledigenBis: _oNotiz.oDatumZuErledigenBis,
                            oDatumAbgeschlossen: null,
                            oDatumErstellt: null,
                            bStatus: null };

            this.response = await this.httpService.ajax('POST', '/api/notizen', oNotiz);

        /* Datensatz Update */
        } else {
            this.response = await this.httpService.ajax('PATCH', `/api/notizen/${_iId}`, _oNotiz);
        }

        return this.response;
    }

    /* Datensatz löschen */
    async deleteDatensatz(_iId) {
        this.response = await this.httpService.ajax('DELETE', `/api/notizen/${_iId}`);
        return this.response;
    }
}
