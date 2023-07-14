import * as fs from "fs";
import { dateToString, sameDay } from "../util/utils";
import { Subject } from "./subjectModel";

export class Task {

    private static tasks: Map<number, Task> = new Map();
    private static lastUpdated: number;
    public static TaskId = 0;

    private id: number;
    private text: string;
    private date: number;
    private done: boolean;
    private generated: boolean;

    constructor(id: number, text: string, done: boolean, date: number, generated: boolean) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.done = done;
        this.generated = generated;
    }

    public static get(id: number): Task {
        return Task.tasks.get(id);
    }

    public static generateId(): number {
        return Task.TaskId++;
    }

    public static loadAll(): void {
        const data: {
            tasks: { text: string; done: boolean; date: number }[];
            lastUpdated: number;
        } = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));

        data.tasks.forEach((task) => {
            if (!task.done && task.date < new Date(Date.now()).setHours(0, 0, 0, 0)) task.date = Date.now();
            new Task(this.TaskId++, task.text, task.done, task.date, false).register();
        });

        Task.lastUpdated = data.lastUpdated;
        if (!sameDay(Task.lastUpdated, Date.now())) {
            while (!sameDay(Task.lastUpdated, Date.now())) {
                const lastUpdatedDate = new Date(Task.lastUpdated);
                Task.lastUpdated = new Date(lastUpdatedDate.getTime()).setDate(lastUpdatedDate.getDate() + 1);
                Task.getGeneratedTask(Task.lastUpdated).forEach((task) => {
                    if (!task.done && task.date < new Date(Date.now()).setHours(0, 0, 0, 0)) task.date = Date.now();
                    task.generated = false;
                    task.register();
                });
            }
        }

        Task.storeAll();
    }

    public static storeAll(): void {
        Task.lastUpdated = Date.now();
        fs.writeFileSync(
            "./data/tasks.json",
            JSON.stringify({
                tasks: Task.getAll().map<{ text: string; done: boolean; date: number }>((t) => ({
                    text: t.getText(),
                    done: t.getDone(),
                    date: t.getDate()
                })),
                lastUpdated: Task.lastUpdated
            })
        );
    }

    public static getAll(): Task[] {
        return Array.from(Task.tasks, ([key, value]) => value);
    }

    public static getAllFilteredByDate(timestamp: number): Task[] {
        let tasks: Task[] = Task.getAll().filter((task) => sameDay(task.date, timestamp));

        const tomorrow: Date = new Date(new Date(new Date().getTime()).setDate(new Date().getDate() + 1));
        if (timestamp >= tomorrow.setHours(0, 0, 0, 0)) tasks = tasks.concat(Task.getGeneratedTask(timestamp));

        return tasks;
    }

    public static getGeneratedTask(timestamp: number): Task[] {
        const revisions: { subject: Subject; date: number }[] = Subject.getSubjectsForRevision(timestamp);
        return revisions.map<Task>(
            (r) => new Task(Task.generateId(), `${r.subject.getName()} (${r.subject.getType()}) du ${dateToString(r.date)}`, false, timestamp, true)
        );
    }

    public register(): void {
        Task.tasks.set(this.id, this);
    }

    public delete(): void {
        Task.tasks.delete(this.id);
    }

    public getId(): number {
        return this.id;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getDone(): boolean {
        return this.done;
    }

    public setDone(done: boolean): void {
        this.done = done;
    }

    public getDate(): number {
        return this.date;
    }

    public setDate(date: number): void {
        this.date = date;
    }

    public getGenerated(): boolean {
        return this.generated;
    }

}
