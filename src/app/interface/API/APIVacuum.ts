import {Status} from "../Status";

export interface APIVacuum {
  model:string,
  type:string,
  status:Status,
  series:string,
}
