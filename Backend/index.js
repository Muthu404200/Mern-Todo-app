import express from 'express';
import cors from 'cors';
import connect from './utils/connect.js';
import route from './routes/user.js';

const port = process.env.PORT || 8000
const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use("/api",route);

app.listen(port,()=>{
    console.log(`Server Start ${port}`);
})

