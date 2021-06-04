import {KnowledgeBase} from "./KnowledgeBase";
import {Vacuum} from "./Vacuum";
import {User} from "./User";

export interface Service {
  id: string;
  vacuum: Vacuum;
  user: User;
  status: string;
  knowledgeBase: KnowledgeBase;
  createdAt: string;
  updatedAt: string;
}
