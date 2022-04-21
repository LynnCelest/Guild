import { Member } from "./member.model";
import { Quest } from "./quest.model";

export class MemberQuest {
    isAdmin: boolean = false;
    score: number = 0;
    memberId?: number;
    member?: Member;
    questId?: number;
    quest?: Quest;
    createdDateTime?: Date;
}