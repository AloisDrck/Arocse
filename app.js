const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const itemsRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const scoreRoutes = require('./routes/scoreRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001', // L'origine de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permettre les cookies et les en-têtes d'autorisation
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://alois:alois0502@clusterarocse.dgaegvz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterArocse',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/items', itemsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/cart', cartRoutes);

module.exports = app;
