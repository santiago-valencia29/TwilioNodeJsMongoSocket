const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority',{
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true  // comentado para producción
  })
        .then(db => console.log('Db is connected'))
        .catch(err => console.log(err));