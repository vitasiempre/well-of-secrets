const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { readFile } = require('node:fs/promises');
const app = express(); 
const secretsRouter = require('./secrets.js');

let sql;

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use('/', secretsRouter);

app.get('/', async (req, res) => {
    const html = await readFile('./home.html', 'utf8');
    res.type('text/html').send(html);
    
}
);

// Database
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) {
        return console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
