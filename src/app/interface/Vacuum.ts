import {Series} from "./Series";
import {Status} from "./Status";
import {Label} from "./Label";

export interface Vacuum {
  _id: string;
  model: string;
  year: string;
  series: Series;
  serialNumber: String,
  noiseLvl: number,
  type: string;
  weight: number;
  energy: number;
  status: Status;
  label: Label;
  front: string;
  back: string;
  side: string;
}
