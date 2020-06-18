require('dotenv').config(); //cargar variables de entorno .env
const app = require('./server');

require('./database');

app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});

