import express from "express";
import mongoose from 'mongoose';
import router from "./router/user-route";

const app = express();

app.use(express.json())

app.use("/api/user", router)










mongoose.connect('mongodb+srv://hospicefind:jnBBqtjiZ74Ko0PZ@cluster0.jmqfjql.mongodb.net/hospice?retryWrites=true&w=majority')
.then(()=> app.listen(5000))
.then(()=>console.log("connected to database and listening to port 5000"))
.catch((err)=> console.log(err))
