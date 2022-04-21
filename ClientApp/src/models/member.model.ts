import { MemberQuest } from "./memberquest.model";

export class Member {
    id?: number;
    name: string = "";
    gender: string = "";
    email: string = "";
    address: string = "";
    currency: number = 0;
    memberQuests: MemberQuest[] = [];
    createdDateTime?: Date;
}