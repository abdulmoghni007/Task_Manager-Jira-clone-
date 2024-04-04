import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }


    getUser(): Observable<any> {
      let token = localStorage.getItem('token');
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      return this.http.post<any>(
        environment.api + '/getUser',
        null,
        {headers}
      );
    }

}
