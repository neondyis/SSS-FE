import {KnowledgeBase} from "./KnowledgeBase";
import {Issue} from "./Issue";

export interface Diagnose {
  _id: string;
  issues: Issue[];
  knowledgeBase:string;
  createdAt: Date;
  updatedAt: Date;
}
