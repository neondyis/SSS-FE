import {Vacuum} from "./Vacuum";
import {History} from "./History";

export interface Passport {
  _id: string,
  vacuum: Vacuum,
  timeline: History[]
}
