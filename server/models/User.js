"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, require: true },
    tasks: [
        {
            title: String,
            content: String,
            date: String,
            time: String,
        },
    ],
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
