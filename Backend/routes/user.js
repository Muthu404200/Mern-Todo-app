import express from 'express';
import { deldata, getdata, postdata,  toggleCompleted } from '../controller/user.js';

const route = express.Router();

route.get("/",getdata);
route.post("/",postdata);
route.delete("/:id",deldata);
route.put('/:id', toggleCompleted);


export default route;