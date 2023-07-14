import * as fs from "fs";

export enum Type {
    CM = "CM",
    TD = "TD",
    TP = "TP",
}

export class Subject {

    private static subjects: Subject[] = [];

    private name: string;
    private type: Type;
    private day: number;
    private revision: number[];

    constructor(name: string, type: Type, day: number, revision: number[]) {
        this.name = name;
        this.type = type;
        this.day = day;
        this.revision = revision;
    }

    public static loadAll(): void {
        type Lesson = { name: string; type: string; revision: number[] };
        const data: {
            monday: Lesson[];
            tuesday: Lesson[];
            wednesday: Lesson[];
            thursday: Lesson[];
            friday: Lesson[];
            saturday: Lesson[];
            sunday: Lesson[];
        } = JSON.parse(fs.readFileSync("./data/schedule.json", "utf-8"));

        data.monday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 1, lesson.revision).register());
        data.tuesday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 2, lesson.revision).register());
        data.wednesday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 3, lesson.revision).register());
        data.thursday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 4, lesson.revision).register());
        data.friday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 5, lesson.revision).register());
        data.saturday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 6, lesson.revision).register());
        data.sunday.forEach((lesson) => new Subject(lesson.name, Type[lesson.type as keyof typeof Type], 0, lesson.revision).register());
    }

    public register(): void {
        Subject.subjects.push(this);
    }

    public static getSubjectsForRevision(timestamp: number): { subject: Subject; date: number }[] {
        const date: Date = new Date(timestamp);
        const revisions: { subject: Subject; date: number }[] = [];

        Subject.subjects.forEach((subject) => {
            subject.revision.forEach((r) => {
                const lessonDay: Date = new Date(new Date(date.getTime()).setDate(date.getDate() - r));
                if (lessonDay.getDay() === subject.day) revisions.push({ subject: subject, date: lessonDay.getTime() });
            });
        });
        return revisions;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): Type {
        return this.type;
    }

}
