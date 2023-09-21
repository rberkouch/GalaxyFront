import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../model/sujet';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SujetService {
  constructor(private http: HttpClient) {}

  public getSujets(): Observable<any> {
    return this.http.get(environment.backendHost + '/sujets');
  }
  public getSujetsByUsername(username: string): Observable<any> {
    return this.http.get(environment.backendHost + '/sujets/user/' + username);
  }
  public getSujetById(id: number) {
    return this.http.get<any>(environment.backendHost + '/sujets/' + id);
  }

  public addSujet(sujet: Sujet): Observable<any> {
    return this.http.post(environment.backendHost + '/sujets', sujet);
  }

  public deleteSujet(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/sujets/' + id);
  }
  public deleteOneFromDocumentProjetUtilisateurs(
    idSujet: number,
    idUser: string
  ): Observable<any> {
    return this.http.delete(
      environment.backendHost + '/sujets/' + idSujet + '/' + idUser
    );
  }

  public updateSujet(sujet: Sujet): Observable<any> {
    return this.http.put(environment.backendHost + '/sujets', sujet);
  }
  public affectSujetToUser(idSujet: string, idUser: string): Observable<any> {
    const formData = new FormData();
    formData.append('idSujet', idSujet);
    formData.append('idUser', idUser);
    const requestHttp = new HttpRequest(
      'POST',
      environment.backendHost + '/sujets/insertsujetuser',
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(requestHttp);
  }
}
