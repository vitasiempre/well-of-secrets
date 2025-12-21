// const express = require('express');
// const router = express.Router();

// // ROUTES

// // Create secret
// router.post('/submit', async(req, res) => {
//     try {
//         const {text} = req.body;
//         const newSecret = await pool.query("INSERT INTO secrets (text) VALUES($1), [text]");
//         res.json(newSecret)
//     } catch (error) {
//         console.error(error.message);
//     }
    
// });

// // Get all secrets

// router.get('/load', (req, res) => {});

// module.exports = router;