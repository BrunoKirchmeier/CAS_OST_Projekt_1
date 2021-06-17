import oApp from './app.js';

/* Node Server starten */
const hostname = '127.0.0.1';
const port = 3000;
oApp.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
