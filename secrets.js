const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
    const secret = req.body;
    res.json({message: 'thank you for your secret'})
});

router.get('/load', (req, res) => {});

module.exports = router