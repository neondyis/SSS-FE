import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vacuum} from "../interface/Vacuum";
import {Observable} from "rxjs";
import {APIVacuum} from "../interface/API/APIVacuum";
import {map} from "rxjs/operators";
import {APIResponse} from "../interface/API/APIResponse";

@Injectable({
  providedIn: 'root'
})
export class VacuumService {

  constructor(private http: HttpClient) {
  }

  updateVacuum(vacuum: Vacuum): Observable<any> {
    return this.http.put<APIResponse>(`http://localhost:3000/api/vacuum/${vacuum._id}`, {
      series: vacuum.series._id,
      status: vacuum.status._id,
      model: vacuum.model,
      label: vacuum.label._id,
      type: vacuum.type
    }).pipe(map(res => {
      return res.data
    }))
  }

  createVacuum(vacuum: APIVacuum): Observable<any> {
    return this.http.post(`http://localhost:3000/api/vacuum/`, vacuum);
  }
}
