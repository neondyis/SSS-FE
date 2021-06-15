import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Service} from "../interface/Service";
import {APIService} from "../interface/API/APIService";
import {APIServiceInfo} from "../interface/API/APIServiceInfo";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServicingService {

  constructor(private http: HttpClient) { }

  getServiceVacuums():Observable<Service[]>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/service`).pipe(map(res =>{
        return res.data
      }
    ))
  }

  startServicing(service:APIService):Observable<any>{
    return this.http.post<APIResponse>(`${environment.BASEAPI}api/service`,{status:service.status,vacuum:service.vacuum}).pipe(map(res => {
      return res.data
    }))
  }

  getServiceDetails(serviceId:string):Observable<any>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/service/${serviceId}`).pipe(map(res =>{
      return res.data;
    }))
  }

  updateServiceVacuum(service:APIService,serviceId:string):Observable<any>{
    return this.http.put<APIResponse>(`${environment.BASEAPI}api/service/${serviceId}`,service).pipe(map(res =>{
        return res.data
      }
    ))
  }

  getRepairInfo(issueList:string[]):Observable<any>{
    return this.http.post<APIResponse>(`${environment.BASEAPI}api/repair/calculate`, {issues:issueList}).pipe(map(res =>{
        return res.data
      }
    ))
  }

  // getTestingInfo():Observable<any>{
  //   // return this.http.get()
  // }

  updateServiceInfo(serviceInfo: APIServiceInfo, serviceInfoId:string):Observable<any>{
    return this.http.put<APIResponse>(`${environment.BASEAPI}api/service/info/alt/${serviceInfoId}`, serviceInfo).pipe(map(res =>{
        return res.data
      }
    ))
  }

  createServiceInfo(serviceInfo: APIServiceInfo):Observable<any>{
    return this.http.post<APIResponse>(`${environment.BASEAPI}api/service/info`, serviceInfo).pipe(map(res =>{
        return res.data
      }
    ))
  }

  getServiceInfo(serviceId: string):Observable<any>{
    return this.http.get<APIResponse>(`http://localhost:3000/api/service/info/alt/${serviceId}`).pipe(map(res =>{
        return res.data
      }
    ))
  }
}
