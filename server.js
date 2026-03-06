const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Setup Middleware
app.use(express.json());
app.use(cors());
// This tells the server to look for our frontend files in a folder called 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 2. Setup our Database (Updated for Persistent Storage)
// This creates a file named 'abtest.db' in your folder to save data permanently
const db = new sqlite3.Database('./abtest.db'); 

db.serialize(() => {
    // Only create the table if it doesn't already exist
    db.run("CREATE TABLE IF NOT EXISTS tracking (variation TEXT PRIMARY KEY, views INTEGER, signups INTEGER)");
    
    // Only insert A and B if they aren't already in the table
    db.run("INSERT OR IGNORE INTO tracking (variation, views, signups) VALUES ('A', 0, 0)");
    db.run("INSERT OR IGNORE INTO tracking (variation, views, signups) VALUES ('B', 0, 0)");
});

// 3. API Route: Track a view
app.post('/api/track-view', (req, res) => {
    const { variation } = req.body;
    if (variation === 'A' || variation === 'B') {
        db.run("UPDATE tracking SET views = views + 1 WHERE variation = ?", [variation]);
        res.json({ success: true, message: `View recorded for ${variation}` });
    } else {
        res.status(400).json({ error: "Invalid variation" });
    }
});

// 4. API Route: Track a signup
app.post('/api/signup', (req, res) => {
    const { email, variation } = req.body;
    console.log(`New signup: ${email} from Version ${variation}`);

    if (variation === 'A' || variation === 'B') {
        db.run("UPDATE tracking SET signups = signups + 1 WHERE variation = ?", [variation]);
        res.json({ success: true, message: "Signup successful!" });
    } else {
        res.status(400).json({ error: "Invalid variation" });
    }
});

// 5. API Route: View the results (Updated with Conversion Rate)
app.get('/api/results', (req, res) => {
    db.all("SELECT * FROM tracking", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Loop through our rows and calculate the math
        const resultsWithConversion = rows.map(row => {
            let conversionRate = 0;
            
            // We check if views are greater than 0 to avoid dividing by zero!
            if (row.views > 0) {
                // Calculate percentage and round to 2 decimal places
                conversionRate = ((row.signups / row.views) * 100).toFixed(2);
            }
            
            // Return the original data plus our new calculation
            return {
                variation: row.variation,
                views: row.views,
                signups: row.signups,
                conversionRate: `${conversionRate}%`
            };
        });

        res.json(resultsWithConversion);
    });
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});