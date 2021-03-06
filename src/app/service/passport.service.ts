import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../interface/Brand";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import {Passport} from "../interface/Passport";
import {APIPassport} from "../interface/API/APIPassport";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private http: HttpClient) {  }

  getPassports(): Observable<Passport[]>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/passport`).pipe(map(res => {
      return res.data
    }))
  }

  getPassport(passportId: string): Observable<any>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/passport/${passportId}`).pipe(map(res => {
      return res.data
    }))
  }

  getPassportByVacuum(vacuumId: string): Observable<any>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/passport/vacuum/${vacuumId}`).pipe(map(res => {
      return res.data
    }))
  }

  createPassport(passport: APIPassport): Observable<any>{
    return this.http.post<APIResponse>(`${environment.BASEAPI}api/passport`,passport).pipe(map(res => {
      return res.data
    }))
  }

  deletePassport(): Observable<Brand[]>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/passport`).pipe(map(res => {
      return res.data
    }))
  }
}
