import {Status} from "../Status";

export interface APIVacuum {
  model:string,
  serialNumber: String,
  noiseLvl: number,
  year: string,
  weight: number;
  energy: number;
  type:string,
  status:Status,
  series:string,
}
