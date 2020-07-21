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

// MySQL 컨넥션 만들기
const MySQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fk2qjf!!",
    database: "nodemysql"
})

// MySQL 컨넥트
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

// MySQL 테이블 생성
app.get("/createpoststable", (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    MySQL.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Posts table created...");
    })
})

// "post" 테이블에 1 삽입
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post One', body: "This is post number two" };
    let sql = 'INSERT INTO posts SET ?';
    let query = MySQL.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Post 2 added...");
    })

})

// SELECT "posts" 테이블
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = MySQL.query(sql,(err, results) => {
        if(err) throw err;
        console.log(results);
        res.send("Posts fetched...");
    })

})

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = MySQL.query(sql,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Post fetched...");
    })

})

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = "Updated Title"
    let sql = `UPDATE posts set title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = MySQL.query(sql,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Post updated...");
    })

})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = MySQL.query(sql,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Post deleted...");
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


