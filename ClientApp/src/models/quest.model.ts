import { User } from "./user.model";

export class Quest {
    id?: number;
    name: string = "";
    description: string = "";
    reward: number = 0;
    users?: User[];
    createdDateTime?: Date;
    completedDateTime?: Date;
  }