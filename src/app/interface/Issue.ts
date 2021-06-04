import {Part} from "./Part";

export interface Issue {
  _id:string;
  description: string;
  diagnose: string;
  part: Part;
}
