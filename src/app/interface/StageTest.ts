import {StageTestContent} from "./StageTestContent";
import {Test} from "./Test";

export interface StageTest {
  _id: string;
  content: Array<StageTestContent>;
  name: string;
  test: Test;
  description: string;
}
