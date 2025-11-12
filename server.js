const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database(path.join(__dirname, 'mini_ride.db'));


// ---------------------------
// API ROUTES
// ---------------------------


// Get all drivers
app.get('/drivers', (req, res) => {
db.all('SELECT * FROM drivers', [], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
});


// Add a driver
app.post('/drivers', (req, res) => {
const { name, latitude, longitude, rating } = req.body;
db.run('INSERT INTO drivers (name, latitude, longitude, rating) VALUES (?, ?, ?, ?)',
[name, latitude, longitude, rating || 5.0],
function(err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ id: this.lastID, name, latitude, longitude, rating });
});
});


// Match nearest and highest-rated driver
app.post('/match', (req, res) => {
const { pickup, drop } = req.body;
db.all('SELECT * FROM drivers', [], (err, drivers) => {
if (err) return res.status(500).json({ error: err.message });
function dist(a,b){ return Math.sqrt(Math.pow(a.latitude-b.lat,2)+Math.pow(a.longitude-b.lng,2)); }
const candidates = drivers.map(dr => ({driver: dr, score: dist(dr,pickup)-(dr.rating-4.0)}));
candidates.sort((a,b)=>a.score-b.score);
const chosen = candidates.length>0?candidates[0].driver:null;
res.json({ driver: chosen });
});
});


// Create a ride
app.post('/ride', (req, res) => {
const { user_id, driver_id, pickup, drop, distance_km } = req.body;
db.run('INSERT INTO rides (user_id, driver_id, pickup_lat, pickup_lng, drop_lat, drop_lng, distance_km, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
[user_id, driver_id, pickup.lat, pickup.lng, drop.lat, drop.lng, distance_km || 0.0, 'requested'],
function(err){
if(err) return res.status(500).json({error:err.message});
res.json({id:this.lastID, status:'ok'});
});
});


app.listen(PORT, () => console.log(` Mini Ride API running on http://localhost:${PORT}`));