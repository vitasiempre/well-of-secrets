import { z } from "zod";
const INVISIBLE_CHARS = /[\u0000-\u001F\u007F\u200B\u200C\u200D\uFEFF\u2060]/g;

const SecretSchema = z.object({
  text: z
    .string()
    .transform((s) => s.replace(INVISIBLE_CHARS, "").trim())
    .refine((s) => s.length > 0, { message: "Text is required." })
    .refine((s) => s.length <= 280, { message: "Text is too long (max 280)." }),
});

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
app.post("/submit", async (req, res) => {
  try {
    const parsed = SecretSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { text } = parsed.data;

    const newSecret = await pool.query(
      "INSERT INTO secrets (text) VALUES($1) RETURNING *",
      [text]
    );

    res.json({ ok: true, secret: newSecret.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Server error" });
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
