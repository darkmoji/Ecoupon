import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthServiceProvider {

  private apiUrl_login = 'http://muffinman.xyz/api/login';
  private apiUrl_user = 'http://muffinman.xyz/api/user';

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  getUser(): Observable<{}> {
    return this.http.get(this.apiUrl_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postUser(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_user, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_login, body).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // postUser(name): Observable<{}> {
  //   const body = {'my_name': name};
  //   return this.http.post(this.apiUrl, body, {responseType: 'text'}).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  //for support

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
