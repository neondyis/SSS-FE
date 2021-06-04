import {KnowledgeBase} from "./KnowledgeBase";

export interface Disassemble {
  _id: string;
  step: number;
  knowledgeBase: string;
  content:string;
  createdAt: Date;
  updatedAt: Date;
}
