import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogin(user_id: string, user_password: string): Observable<any> {
    let user = new HttpParams();
    user = user.set('user_id', user_id);
    user = user.set('user_password', user_password);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/login.php", user);
  }
  constructor(private http: HttpClient) { }
}
