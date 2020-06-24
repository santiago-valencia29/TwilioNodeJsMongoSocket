require('dotenv').config(); //cargar variables de entorno .env
const app = require('./server');
const http = require('http'); // config socket.io

const server = http.createServer(app);// config socket.io


require('./database');
require('./sockets').connection(server);

server.listen(app.get('port'), () => { //sin config socket.io es app.listen
    console.log('Server on port', app.get('port'))
});

