import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.TASK_DB_URI);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/new", async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = new User(user);
  User.findOneAndUpdate(
    user,
    user,
    { upsert: true, new: true, setDefaultOnInsert: true },
    (error, result) => {
      if (error) {
        console.log("error");
      }
    }
  );

  // await newUser.save();
  res.json(user);
});

app.post("/add", async (req: Request, res: Response) => {
  const username = req.body.username;
  //await User.findOne({username:username})
  console.log(username);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
