import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import { environment } from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  getLabelList():Observable<any>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/label`).pipe(map(res =>{
        return res.data
      }
    ))
  }
}
