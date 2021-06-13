import express from 'express';
import {oNotizenController} from '../../controller/notizenController.js';

const oRouter = express.Router();

oRouter.get('/notizen/:id', oNotizenController.getDatensatzById.bind(oNotizenController));
oRouter.patch('/notizen/:id', oNotizenController.updateDatensatz.bind(oNotizenController));
oRouter.delete('/notizen/:id', oNotizenController.deleteDatensatz.bind(oNotizenController));

oRouter.get('/notizen', oNotizenController.getDatensaetze.bind(oNotizenController));
oRouter.post('/notizen', oNotizenController.insertDatensatz.bind(oNotizenController));

export const oNotizenRoutes = oRouter;
