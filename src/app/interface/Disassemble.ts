import {KnowledgeBase} from "./KnowledgeBase";

export interface Disassemble {
  _id: string;
  step: number;
  knowledgeBase: string;
  content:string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
