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

const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log("User Connected")
    socket.on("chat message", msg => {
        io.emit('chat message', "sdfasfd")
    })
})
