export interface Quests {
    id: number;
    name: string;
    description: string;
    reward: number;
    users: string;//Should have its own interface later.
    create: Date;
    complete: Date;
  }