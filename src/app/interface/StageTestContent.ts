import {StageTest} from "./StageTest";

export interface StageTestContent {
  _id: string;
  content: string;
  stage: StageTest;
  step: number;
  image: string;
}
