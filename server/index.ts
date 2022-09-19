import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";
import { Task } from "./models/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://testuser:CzuthqtqGFIWwgSF@cluster0.vd33s.mongodb.net/task_manager?retryWrites=true&w=majority"
);

app.get("/", (req: Request, res: Response) => {
  const username = req.query.username;

  User.findOne({ username }, (err: string, result: Task) => {
    err ? res.json(err) : res.json(result);
  });
  //res.send("Express + TypeScript Server");
});

app.post("/new", async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = new User(user);
  await User.findOneAndUpdate(
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
  const username = req.query.username;
  await User.findOne({ username: username }).then((doc) => {
    console.log(doc);
    doc?.tasks.push(req.body);
    doc?.save();
    res.json(doc?.tasks.at(-1));
  });
  console.log(username);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
