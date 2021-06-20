import {KnowledgeBase} from "./KnowledgeBase";
import {Vacuum} from "./Vacuum";
import {User} from "./User";
import {Repair} from "./Repair";

export interface Service {
  _id: string;
  vacuum: Vacuum;
  user: User;
  status: string;
  generatedRepairs: Repair[];
  notes: {_id: string, content: string, image: string}[];
  knowledgeBase: KnowledgeBase;
  createdAt: string;
  updatedAt: string;
}
