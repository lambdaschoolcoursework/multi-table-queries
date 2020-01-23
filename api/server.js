const express = require('express');
const router = require('../schemes/router');

app = express();

app.use(express.json());
app.use('/api/schemes', router);

module.exports = app;