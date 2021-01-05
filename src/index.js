const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
app.use(cors());
app.use(express.json());

app.get("/api/banks", async (req, res) => {
  try 
  {
    const allBanks = await pool.query("SELECT * FROM banks");
    res.json(allBanks.rows);
  } 
  catch (err) 
  {
    console.error(err.message);
  }
});

app.get("/api/branches/autocomplete", async (req, res) => {
  
  try 
  {
    var branch = req.query.q;
    var limit = req.query.limit;
    var offset = req.query.offset;
    
    //Handling for empty parameters
    if(branch !== '')
    branch="RTGS";

    if(!limit)
    limit=3;

    if(!offset)
    offset=0;

    const results = await pool.query("SET client_encoding to 'win1252';  SELECT ifsc, bank_id, branch, address, city, district, state FROM branches where branch like '" + `${branch}` +"%' order by ifsc LIMIT " + `${limit}` + " OFFSET " + `${offset}`);
    
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

  } 
    catch (err) 
    {
      console.error(err.message);
    }
});

app.get("/api/branches/autocomplete", async (req, res) => {
  
  try 
  {
    const branch = req.query.q;
    const limit = req.query.limit;
    const offset = req.query.offset;
    
    if(Object.keys(req.query).length !== 0)
    console.log("29");

    const results = await pool.query("SET client_encoding to 'win1252';  SELECT ifsc, bank_id, branch, address, city, district, state FROM branches where branch like '" + `${branch}` +"%' order by ifsc LIMIT " + `${limit}` + " OFFSET " + `${offset}`);
    
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

  } 
    catch (err) 
    {
      console.error(err.message);
    }
});


app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});