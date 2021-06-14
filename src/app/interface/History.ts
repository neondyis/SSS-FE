import {Service} from "./Service";
import {ServiceInfo} from "./ServiceInfo";

export interface History {
  _id:string,
  service: Service,
  serviceInfo:ServiceInfo,
  passport: string
}
