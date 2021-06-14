import {Diagnose} from "./Diagnose";
import {Disassemble} from "./Disassemble";
import {Repair} from "./Repair";
import {Test} from "./Test";

export interface KnowledgeBase {
  _id: string;
  diagnose: Diagnose[];
  disassemble: Disassemble[];
  repair: Repair[];
  test: Test[];
  createdAt: Date;
  updatedAt: Date;
}
