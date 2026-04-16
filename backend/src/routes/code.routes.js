const express = require('express');
const { compileCode } = require('../controllers/code.controller');

const router = express.Router();

router.post('/compile', compileCode);

module.exports = router;
