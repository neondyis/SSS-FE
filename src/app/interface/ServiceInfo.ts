import {Service} from "./Service";
import {Issue} from "./Issue";
import {RepairStep} from "./RepairStep";
import {StageTestContent} from "./StageTestContent";

export interface ServiceInfo {
  _id: string;
  service: Service;
  repairs: RepairStep[];
  diagnosis: Issue[];
  tests: StageTestContent[];
}
