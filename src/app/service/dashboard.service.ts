import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vacuum} from "../interface/Vacuum";
import {map} from "rxjs/operators";
import {APIResponse} from "../interface/API/APIResponse";
import {DashboardResponse} from "../interface/API/DashboardResponse";
import {ServicingService} from "./servicing.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private servicingService:ServicingService) { }

  getStock():Observable<DashboardResponse> {
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/vacuum`).pipe(map(res => {
      const greenVacuums:Vacuum[] = res.data.filter((vacuum:Vacuum) => vacuum.status.color === "Green");
      const yellowVacuums:Vacuum[] = res.data.filter((vacuum:Vacuum) => vacuum.status.color === "Yellow");
      const orangeVacuums:Vacuum[] = res.data.filter((vacuum:Vacuum) => vacuum.status.color === "Orange");
      const redVacuums:Vacuum[] = res.data.filter((vacuum:Vacuum) => vacuum.status.color === "Red");

      return { greenVacuums: greenVacuums, orangeVacuums: orangeVacuums, redVacuums: redVacuums, yellowVacuums: yellowVacuums };
    }))
  }

  getServicing():Observable<any>{
    return this.servicingService.getServiceVacuums().pipe(map(res=> {
      return res;
    }))
  }
}
