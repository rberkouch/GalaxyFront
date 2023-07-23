import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  formationId : any;

  constructor(private http: HttpClient) {}

  public getFormations():Observable<Array<any>>{
    return this.http.get<Array<any>>(environment.backendHost+"/formations")
  }

  public getFormationById(idFormation : number ){
    return this.http.get<any>(environment.backendHost+"/formations/"+idFormation)
  }
}
