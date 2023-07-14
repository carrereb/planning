import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import taskRouter from "./routers/task";
import { Task } from "./models/taskModel";
import cors from "cors";
import schedule from 'node-schedule';
import { Subject } from "./models/subjectModel";

const app: Application = express();

const { PORT, HOST } = process.env;

Subject.loadAll();
Task.loadAll();
console.log("Data loaded");

// run everyday at midnight
schedule.scheduleJob("0 0 * * *", () => {
    Task.loadAll();
});

app.use(
    cors({
        origin: true
    })
);
app.use(express.json());
app.use("", taskRouter);

app.listen(parseInt(PORT), HOST, () => {
    console.log(`The application is listening on port http://${HOST}:${PORT}`);
});
