import "dotenv/config";
import { z } from "zod";
import express from "express";
import cors from "cors";
const INVISIBLE_CHARS = /[\u0000-\u001F\u007F\u200B\u200C\u200D\uFEFF\u2060]/g;
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://by.vitasiempre.com",
  "https://well-of-secrets.by.vitasiempre.com",
];

const SecretSchema = z.object({
  text: z
    .string()
    .transform((s) => s.replace(INVISIBLE_CHARS, "").trim())
    .refine((s) => s.length > 5, { message: "This doesn't feel like a secret" })
    .refine((s) => s.length <= 1000, { message: "Your secret should be under 1000 characters" })
    .refine((s) => s.split(/\s+/).length >= 2, {
    message: "This doesn't feel like a secret" }),
});

import { readFile } from 'node:fs/promises';
const app = express(); 
import pool from "./db.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({
    origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    return ALLOWED_ORIGINS.includes(origin)
      ? cb(null, true)
      : cb(new Error("Not allowed by CORS"));
    },
}));
app.use(express.json());

app.get('/api/', async (req, res) => {
    const html = await readFile("home.html", "utf8");
    res.type('text/html').send(html);
    
}
);

app.get("/", (req, res) => {
  res.send("ok");
});

// ROUTES

// Create secret
app.post("/api/submit", async (req, res) => {
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

app.get('/api/load', async (req, res) => {
    try {
        const allSecrets = await pool.query("SELECT * FROM secrets ORDER BY created_at DESC");
        res.json(allSecrets.rows);
        
    } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});