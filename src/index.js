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
    const results = await pool.query("SET client_encoding to 'win1252';  SELECT ifsc, bank_id, branch, address, city, district, state FROM branches;");
    
    // console.log(results[1].rows);

    let filteredData = [];
    filteredData.push("ifsc ,bank_id , branch , address , city , district , state");

    for(var i=0;i<results[1].rows.length;i++)
      {
         let eachFilteredData = [];
         var data = results[1].rows[i];
         eachFilteredData.push(data.ifsc);
         eachFilteredData.push(data.bank_id);
         eachFilteredData.push(data.branch);
         eachFilteredData.push(data.address);
         eachFilteredData.push(data.city);
         eachFilteredData.push(data.district);
         eachFilteredData.push(data.state);
         
         filteredData.push(eachFilteredData);
      }
     
    res.send(JSON.stringify(filteredData, null, 2));
    // res.send(filteredData);
  } 
    catch (err) {
    console.error(err.message);
  }
});


app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});