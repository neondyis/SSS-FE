import {RepairStep} from "./RepairStep";
import {Issue} from "./Issue";

export interface Repair {
  _id: string;
  issue:Issue;
  knowledgeBase: string;
  repairSteps:RepairStep[];
  createdAt: Date;
  updatedAt: Date;
}
