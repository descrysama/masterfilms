const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DATABASE_URL, {
    useNewUrlParser: true
})
.then(() => console.log('Connecté à la base de donnée'))
.catch((err) => console.log(err));
