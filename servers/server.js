const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const cors = require("cors")

app.use(cors());
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'Jiwon'}));

app.listen(PORT, ()=>{
    console.log(`express is running on ${PORT}`);
})