import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const headers= new HttpHeaders({
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
});


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }



  public upload(formData:FormData):Observable<any> {
    return this.httpClient.post<any>(`${environment.BASEAPI}image/upload`, formData,{headers: headers});
  }
}
