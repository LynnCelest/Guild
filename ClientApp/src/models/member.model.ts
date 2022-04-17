import { Quest } from "./quest.model";

export class Member {
    id?: number;
    name: string = "";
    gender: string = "";
    email: string = "";
    address: string = "";
    currency: number = 0;
    quests?: Quest[];
    createdDateTime?: Date;
}