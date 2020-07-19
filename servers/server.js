import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import SocketIO from "socket.io";
import morgan from "morgan";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/api', (req, res)=> res.json({username:'Jiwon'}));


const server = app.listen(PORT, ()=>{
    console.log(`express is running on ${PORT}`);
})

const io = SocketIO.listen(server);

let sockets = [];

io.on('connection', (socket) => {
    sockets.push(socket)
    socket.on("init", (props) => console.log(`${props.name}: 안녕하세요!!!`));
    socket.broadcast.emit("welcome", "유저가 접속하였습니다.")
})

console.log(sockets);