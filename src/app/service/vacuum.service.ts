import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vacuum} from "../interface/Vacuum";
import {Observable} from "rxjs";
import {APIVacuum} from "../interface/API/APIVacuum";
import {map} from "rxjs/operators";
import {APIResponse} from "../interface/API/APIResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VacuumService {

  constructor(private http: HttpClient) {
  }

  updateVacuum(vacuum: Vacuum): Observable<any> {
    return this.http.put<APIResponse>(`${environment.BASEAPI}api/vacuum/${vacuum._id}`, {
      series: vacuum.series._id,
      status: vacuum.status._id,
      model: vacuum.model,
      year: vacuum.year,
      noiseLvl: vacuum.noiseLvl,
      serialNumber: vacuum.serialNumber,
      energy: vacuum.energy,
      weight: vacuum.weight,
      label: vacuum.label._id,
      type: vacuum.type,
      front: vacuum.front,
      back: vacuum.back,
      side: vacuum.side
    }).pipe(map(res => {
      return res.data
    }))
  }

  createVacuum(vacuum: APIVacuum): Observable<any> {
    return this.http.post(`${environment.BASEAPI}api/vacuum/`, vacuum);
  }
}
