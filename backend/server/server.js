require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
var cors = require('cors');
const port = 80;
const app = express();
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/', apiRoutes);

app.listen(port);