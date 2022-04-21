import { Member } from "./member.model";
import { MemberQuest } from "./memberquest.model";

export class Quest {
    id?: number;
    name: string = "";
    description: string = "";
    reward: number = 0;
    memberQuests: MemberQuest[] = [];
    createdDateTime?: Date;
    completedDateTime?: Date;
  }