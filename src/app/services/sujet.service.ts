import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../model/sujet';

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  
  constructor(private http: HttpClient) {}

  public getSujets():Observable<any>{
    return this.http.get(environment.backendHost+"/sujets")
  }

  public getSujetById(id : number ){
    return this.http.get<any>(environment.backendHost+"/sujets/"+id)
  }

  public addSujet(sujet: Sujet): Observable<any> {
    return this.http.post(environment.backendHost + "/sujets", sujet);
  }

  public deleteSujet(id:number):Observable<any>
  {
    return this.http.delete(environment.backendHost + "/sujets/" + id);
  }

  public updateSujet(sujet: Sujet): Observable<any> {
    return this.http.put(environment.backendHost + "/sujets", sujet);
  }
}
