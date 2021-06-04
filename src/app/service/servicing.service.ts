import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Service} from "../interface/Service";
import {APIService} from "../interface/API/APIService";
import {Vacuum} from "../interface/Vacuum";

@Injectable({
  providedIn: 'root'
})
export class ServicingService {

  constructor(private http: HttpClient) { }

  getServiceVacuums():Observable<Service[]>{
    return this.http.get<APIResponse>("http://localhost:3000/api/service").pipe(map(res =>{
        return res.data
      }
    ))
  }

  startServicing(service:APIService):Observable<any>{
    return this.http.post<APIResponse>("http://localhost:3000/api/service",{status:service.status,vacuum:service.vacuum}).pipe(map(res => {
      // console.log(res)
    }))
  }

  getServiceDetails(serviceId:string):Observable<any>{
    return this.http.get<APIResponse>(`http://localhost:3000/api/service/${serviceId}`).pipe(map(res =>{
      return res.data;
    }))
  }

  updateServiceVacuum(service:APIService,serviceId:string):Observable<any>{
    return this.http.put<APIResponse>(`http://localhost:3000/api/service/${serviceId}`,service).pipe(map(res =>{
        return res.data
      }
    ))
  }

  getRepairInfo(issueList:string[]):Observable<any>{
    return this.http.post<APIResponse>(`http://localhost:3000/api/repair/calculate`, {issues:issueList}).pipe(map(res =>{
        return res.data
      }
    ))
  }
}
