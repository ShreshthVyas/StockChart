// import express from 'express';
const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const {loginRoutes} = require('./login.cjs');
const {registerRoutes}= require('./register.cjs');



const app = express();
app.use(cors());
const port = 8080;

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Middleware to parse JSON bodies
app.use(express.json());
console.log('Mounting register router...');
// Mount the router
app.use('/register', registerRoutes);
// Log a message after mounting the router
console.log('Register router mounted successfully.');
// Routes
app.use('/login', loginRoutes);


// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS historical_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        price FLOAT,
        instrument_name TEXT
    )
`);

// Route to insert CSV data into SQLite database
app.get('/insert-data', (req, res) => {
    // Read CSV file and insert data into database
    fs.createReadStream('historical_prices.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            // Insert data into SQLite table
            db.run(
                'INSERT INTO historical_data (date, price, instrument_name) VALUES (?, ?, ?)',
                [row.date, row.price, row.instrument_name],
                (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                }
            );
        })
        .on('end', () => {
            res.send('Data inserted into SQLite database successfully!');
        });
});

app.get('/historical-data', (req, res) => {
    // Parse query parameters
    const { instrument_name, from_date, to_date } = req.query;

    // Construct SQL query
    const sql = `
    SELECT * FROM historical_data
    WHERE instrument_name = ? AND date >= ? AND date <= ?
    `;

    // Execute SQL query with parameters
    db.all(sql, [instrument_name, from_date, to_date], (err, rows) => {
        if (err) {
            console.error(err.message); // Log the error message
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Send response with retrieved data
        res.json(rows);
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
