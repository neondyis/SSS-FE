import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Series} from "../interface/Series";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Series[]>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/series`).pipe(map(res=> {
      return res.data
    }))
  }
}
