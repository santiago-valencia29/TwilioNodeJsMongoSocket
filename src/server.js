const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// app.get('/', (req,res)=>{
//     res.send('hello world')
// })

// servidor en varias secciones:

//settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views')); //para saber ubicación de archivos html
app.engine('.hbs',exphbs({
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    defaultLayout: 'main',
    extname:'.hbs'
}));

app.set('view engine','.hbs');


//middlewares


//routes
app.use(require('./routes/index.routes'));

//static files

module.exports = app;