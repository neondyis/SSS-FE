import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../interface/Brand";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import {APIHistory} from "../interface/API/APIHistory";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {  }

  getHistories(): Observable<Brand[]>{
    return this.http.get<APIResponse>('http://localhost:3000/api/history').pipe(map(res => {
      return res.data
    }))
  }

  createHistory(history: APIHistory): Observable<any>{
    return this.http.post<APIResponse>('http://localhost:3000/api/history',history).pipe(map(res => {
      return res.data
    }))
  }

  deleteHistory(): Observable<Brand[]>{
    return this.http.get<APIResponse>('http://localhost:3000/api/brand').pipe(map(res => {
      return res.data
    }))
  }
}
