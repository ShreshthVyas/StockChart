
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config({ path: './codes.env' });


const router = express.Router();
const db = new sqlite3.Database('auth_database.db');
const SECRET_KEY = process.env.JWT_SECRET; 


router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to authenticate' });
            } else if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ username: user.username, userId: user.id }, SECRET_KEY);
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate' });
    }
});



module.exports = { loginRoutes: router };
