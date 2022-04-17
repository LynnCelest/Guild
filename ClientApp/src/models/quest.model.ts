import { Member } from "./member.model";

export class Quest {
    id?: number;
    name: string = "";
    description: string = "";
    reward: number = 0;
    members?: Member[];
    createdDateTime?: Date;
    completedDateTime?: Date;
  }