import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RepairDashService {

  constructor(private http: HttpClient) { }

  getServiceVacuums(){
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/service`).pipe(map(res =>{
        console.log(res.data)
    }
    ))
  }
}
