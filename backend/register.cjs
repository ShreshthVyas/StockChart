// import express from 'express';
const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('auth_database.db');
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY ,
        email TEXT,
        password TEXT
    )
`);
router.use(express.json());

router.post('/', async (req, res) => {
    console.log("after post");
    try {
        console.log("try");
        const { username, email, password } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10); 

        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Failed to register user' });
                } else {
                    res.status(201).json({ message: 'User registered successfully' });
                }
            }
        );
    } 
    
    catch (error) {
        console.log("catch");
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


module.exports = { registerRoutes: router };
