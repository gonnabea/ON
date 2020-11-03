import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import SocketIO from "socket.io"
import morgan from "morgan"
import { socketController } from "./socket-server/socketContoller"
import mysql from "mysql2"
import db from "./models"
import mainRouter from "./router/mainRouter"
import userRouter from "./router/userRouter"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import dotenv from "dotenv"
import "./passport"
import flash from "connect-flash"
import localsMiddlewares from "./middleware"
import { getLoggedUser } from "./controller/userController"

const PORT = process.env.PORT || 3001 // dotenv 쓰면 프록시가 망가짐
const app = express()

dotenv.config()
//////////////////////////////////////// 순수 SQL 테스트 ///////////////////////////////////////////////
// MySQL 컨넥션 만들기
const MySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "our_now",
})

// MySQL 컨넥트
MySQL.connect((err) => {
  if (err) throw err
  console.log("Node connected to MySQL server")
})

// DB 생성
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql"
  MySQL.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("database created...")
  })
})

// MySQL 테이블 생성
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))"
  MySQL.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("Posts table created...")
  })
})

// "post" 테이블에 1 삽입
app.get("/addpost2", (req, res) => {
  let post = { title: "Post One", body: "This is post number two" }
  let sql = "INSERT INTO posts SET ?"
  MySQL.query(sql, post, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("Post 2 added...")
  })
})

// SELECT "posts" 테이블
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts"
  MySQL.query(sql, (err, results) => {
    if (err) throw err
    console.log(results)
    res.send("Posts fetched...")
  })
})

// Select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
  MySQL.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("Post fetched...")
  })
})

// Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title"
  let sql = `UPDATE posts set title = '${newTitle}' WHERE id = ${req.params.id}`
  MySQL.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("Post updated...")
  })
})

// Delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
  MySQL.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send("Post deleted...")
  })
})

//////////////////////////////////////// 순수 SQL 테스트 ///////////////////////////////////////////////

app.use(cors())
app.use(helmet())
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan("dev"))
app.use(flash())
app.use("/currentUser", getLoggedUser) // 현재 로그인 된 유저정보 클라이언트에 전송
app.use(localsMiddlewares)
app.use(mainRouter)
app.use(userRouter)

db.sequelize.sync().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`express is running on ${PORT}`)
  })
  const io = SocketIO.listen(server)

  io.on("connection", (socket) => socketController(socket))
})
