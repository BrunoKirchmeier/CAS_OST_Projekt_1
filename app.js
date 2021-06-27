import express from 'express';
import oNotizenRoutes from './routes/api/notizenRoutes.js';

const app = express();

/* Middelware 1: HTML File ausliefern */
app.use(express.static('public/html'));
app.use(express.static('public'));

/* Middelware 2: API Routen für aktualisieren der Notizen */
app.use('/api', express.json());
app.use('/api', express.urlencoded());
app.use('/api', oNotizenRoutes);

/* Middelware 3: API Errorhandling */
app.use((err, req, res, next) => {
    res.status(500)
    .send('Unbekannter Server Fehler');
    next();
});

const oApp = app;
export default oApp;
