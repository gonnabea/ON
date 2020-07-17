import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'Jiwon'}));

app.listen(PORT, ()=>{
    console.log(`express is running on ${PORT}`);
})