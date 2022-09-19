"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb+srv://testuser:CzuthqtqGFIWwgSF@cluster0.vd33s.mongodb.net/task_manager?retryWrites=true&w=majority");
app.get("/", (req, res) => {
    const username = req.query.username;
    User_1.default.findOne({ username }, (err, result) => {
        err ? res.json(err) : res.json(result);
    });
    //res.send("Express + TypeScript Server");
});
app.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const newUser = new User_1.default(user);
    yield User_1.default.findOneAndUpdate(user, user, { upsert: true, new: true, setDefaultOnInsert: true }, (error, result) => {
        if (error) {
            console.log("error");
        }
    });
    // await newUser.save();
    res.json(user);
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    yield User_1.default.findOne({ username: username }).then((doc) => {
        console.log(doc);
        doc === null || doc === void 0 ? void 0 : doc.tasks.push(req.body);
        doc === null || doc === void 0 ? void 0 : doc.save();
        res.json(doc === null || doc === void 0 ? void 0 : doc.tasks.at(-1));
    });
    console.log(username);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
