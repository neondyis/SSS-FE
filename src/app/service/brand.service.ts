import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../interface/Brand";
import {APIResponse} from "../interface/API/APIResponse";
import {map} from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]>{
    return this.http.get<APIResponse>(`${environment.BASEAPI}api/brand`).pipe(map(res => {
      return res.data
    }))
  }
}
