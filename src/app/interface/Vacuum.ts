import {Series} from "./Series";
import {Status} from "./Status";
import {Label} from "./Label";

export interface Vacuum {
  _id: string;
  model: string;
  series: Series;
  type: string;
  status: Status;
  label: Label;
}
