import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import SocketIO from "socket.io";
import morgan from "morgan";
import { socketController } from "./socket-server/socketContoller";
import mysql from "mysql2";

const PORT = process.env.PORT || 3001;
const app = express();

// 컨넥션 만들기
const MySQL = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"fk2qjf!!"
})

// 컨넥트
MySQL.connect((err) => {
    if(err) throw err;
    console.log("Node connected to MySQL server")
})

// DB 생성
app.get("/createdb", (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    MySQL.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('database created...')
    })
})

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/api', (req, res)=> res.json({username:'Jiwon'}));


const server = app.listen(PORT, ()=>{
    console.log(`express is running on ${PORT}`);
})

const io = SocketIO.listen(server);


io.on('connection', (socket) => socketController(socket))


