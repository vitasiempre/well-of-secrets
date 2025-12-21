const express = require('express');
const cors = require('cors');
const { readFile } = require('node:fs/promises');
const app = express(); 
const pool = require("./db");

app.use(cors({
    origin: '*',
}));
app.use(express.json());

app.get('/', async (req, res) => {
    const html = await readFile("home.html", "utf8");
    res.type('text/html').send(html);
    
}
);

// ROUTES

// Create secret
app.post('/submit', async(req, res) => {
    try {
        const {text} = req.body;
        const newSecret = await pool.query("INSERT INTO secrets (text) VALUES($1) RETURNING *", [text]);
        res.json(newSecret)
    } catch (error) {
        console.error(error.message);
        console.log(error.message);
    }
    
});

// Get all secrets

app.get('/load', async (req, res) => {
    try {
        const allSecrets = await pool.query("SELECT * FROM secrets");
        res.json(allSecrets.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
