require('dotenv').config();
const express = require('express');
require('./config.js')
const cookieParser = require('cookie-parser')
const app = express();
const port = 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
// ROUTES IMPORT

const userRoutes = require('./routes/userRoutes');
const filmRoutes = require('./routes/filmRoutes');

// ROUTES

app.use(userRoutes);
app.use(filmRoutes);



app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))