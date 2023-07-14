import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export async function retriveTasksFromDate(req: Request, res: Response): Promise<void> {
    const date: number = parseInt(req.params.date);
    if (!date) throw new Error("Invalid date provided");

    res.status(200).json({
        data: Task.getAllFilteredByDate(date).map<{ id: number; text: string; date: number; done: boolean; generated: boolean }>((t) => ({
            id: t.getId(),
            text: t.getText(),
            date: t.getDate(),
            done: t.getDone(),
            generated: t.getGenerated()
        }))
    });
}

export async function addTask(req: Request, res: Response): Promise<void> {
    try {
        const data: { text: string; done: boolean; date: number } = req.body.data;
        if (!data) throw Error("Missing data");

        const task = new Task(Task.generateId(), data.text, data.done, data.date, false);
        task.register();

        Task.storeAll();
        res.sendStatus(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

export async function updateTask(req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id);
        if (!id && id !== 0) throw new Error("Invalid id provided");

        const data: { text: string; done: boolean; date: number } = req.body.data;
        if (!data) throw new Error("Missing data");

        const task: Task = Task.get(id);
        if (!task) throw new Error("Invalid id is provided");

        task.setText(data.text);
        task.setDone(data.done);
        task.setDate(data.date);

        Task.storeAll();
        res.sendStatus(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id);
        if (!id && id !== 0) throw new Error("Invalid id provided");

        const task: Task = Task.get(id);
        if (!task) throw new Error("Invalid id is provided");

        task.delete();

        Task.storeAll();
        res.sendStatus(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}
