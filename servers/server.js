import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import SocketIO from "socket.io";
import morgan from "morgan";
import { socketController } from "./socket-server/socketContoller";

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


io.on('connection', (socket) => socketController(socket))


