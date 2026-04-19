const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');

const app = express(); // create app server
app.use(express.json()); // tell website to read json data from frontend 
app.use(express.static(path.join(__dirname, '../frontend'))); // serve frontend files
console.log('Serving from:', path.resolve(__dirname, '../frontend'));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// signup route 
app.post('/signup', async (req, res) => {
    const { username, password } = req.body; // POST request is better than GET in this case becuase its hidden in the body 

    if (!username || !password) {
        return res.json({ success: false, massage: 'All fields are required.'})
    } 

    try {

        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                return res.json({ success: false, massage: 'Database error.'})
            }
            if (results.length > 0) {
                return res.json({ success: false, massage: 'username already taken.'})
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
                [username, hashedPassword], (err) => {
                    if (err) return res.json({ success: false, massage: 'Could not create account.' });
                    res.json({ success: true});
                }
            );
        });
    } catch {
        res.json({ success:false, massage: 'Server error.' });
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'All fields are required.' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error.' });

        if (results.length === 0) {
            return res.json({ success: false, message: 'Invalid username or password.' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({ success: false, message: 'Invalid username or password.' });
        }

        res.json({ success: true, username: user.username });
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

