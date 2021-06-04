import {StageTest} from "./StageTest";

export interface Test {
  _id: string;
  knowledgeBase: string;
  stageTest: StageTest[];
  createdAt: Date;
  updatedAt: Date;
}
