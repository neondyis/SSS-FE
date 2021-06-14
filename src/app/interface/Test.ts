import {StageTest} from "./StageTest";

export interface Test {
  _id: string;
  knowledgeBase: string;
  stageTest: StageTest[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
