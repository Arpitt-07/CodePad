const express = require('express');
const cors = require('cors');
const codeRoutes = require('./routes/code.routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use('/', codeRoutes);

module.exports = app;
