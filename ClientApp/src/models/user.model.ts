import { Quest } from "./quest.model";

export class User {
    id?: number;
    name: string = "";
    currency: number = 0;
    quests?: Quest[];
    createdDateTime?: Date;
}