require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
var cors = require('cors');
const port = 80;
const app = express();
const apiRoutes = require('./routes/api');
const path = require('path');

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/', apiRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port);