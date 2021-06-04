import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Series} from "../interface/Series";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Series[]>{
    return this.http.get<APIResponse>('http://localhost:3000/api/series').pipe(map(res=> {
      return res.data
    }))
  }
}
