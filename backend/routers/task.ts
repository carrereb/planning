import express from "express";
import { verifyToken } from "../controllers/authenticationController";
import { addTask, updateTask, retriveTasksFromDate, deleteTask } from "../controllers/taskController";


const taskRouter = express.Router();

taskRouter.get("/:date", verifyToken, retriveTasksFromDate);
taskRouter.post("/", verifyToken, addTask);
taskRouter.put("/:id", verifyToken, updateTask);
taskRouter.delete("/:id", verifyToken, deleteTask);

export default taskRouter;
