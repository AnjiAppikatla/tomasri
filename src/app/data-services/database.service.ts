import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private baseUrl = 'https://localhost:7201/tomasriWebAPI';

  constructor(private http: HttpClient) {} // ✅ Correct

  getLoggedAgent(username: string, password: string):Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get(`${this.baseUrl}/tomasri/${username}/${password}`);
  

  // return this.http.get(`${this.baseUrl}/GetLoggedAgent/${username}/${password}`);
  }
}
