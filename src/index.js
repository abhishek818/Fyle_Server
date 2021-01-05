const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
app.use(cors());
app.use(express.json());

app.get("/api/banks", async (req, res) => {
  try {
    const allBanks = await pool.query("SELECT * FROM banks");
    res.json(allBanks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/temp", async (req, res) => {
  try {
    const results = await pool.query("SET client_encoding to 'win1252';  SELECT ifsc, branch, address, city, district, state FROM branches;");
    console.log(results);
    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
});


app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});