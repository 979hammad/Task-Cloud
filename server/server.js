import express from "express";
import cors from "cors";
import 'dotenv/config';
const app = express();
import { connectionDB } from "./dataBase/dataBase.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/v1", taskRoutes);
app.use("/api/v1/user", userRoutes)

app.use((err, req, res, next) =>{
  let {status = 500, msg = "Server Error"} = err;
  res.status(status).json(msg);
})

app.listen(process.env.PORT ,()=>{
  connectionDB()
  console.log("Backend Connected!")
})