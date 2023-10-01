import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentProjetUtilisateursService {
  constructor(private http: HttpClient) {}
  
  public getAllDocumentProjetUtilisateurs(): Observable<any> {
    return this.http.get(
      environment.backendHost + '/documentProjetUtilisateurs'
    );
  }

  public affectSujetToUser(idSujet: string, idUser: string): Observable<any> {
    const formData = new FormData();
    formData.append('idSujet', idSujet);
    formData.append('idUser', idUser);
    const requestHttp = new HttpRequest(
      'POST',
      environment.backendHost + '/documentProjetUtilisateurs/insertsujetuser',
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(requestHttp);
  }
  public getDocumentProjetUtilisateurs(
    suejtId: number,
    userId: string
  ): Observable<any> {
    return this.http.get(
      environment.backendHost +
        '/documentProjetUtilisateurs/' +
        suejtId +
        '/' +
        userId
    );
  }
  public deleteOneFromDocumentProjetUtilisateurs(
    idSujet: number,
    idUser: string
  ): Observable<any> {
    return this.http.delete(
      environment.backendHost +
        '/documentProjetUtilisateurs/' +
        idSujet +
        '/' +
        idUser
    );
  }
}
