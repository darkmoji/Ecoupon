import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MypromoServiceProvider {

  private apiUrl = 'http://muffinman.xyz/api/mypromo';

  constructor(public http: HttpClient) {
    console.log('Hello MypromoServiceProvider Provider');
  }

  postMypromo(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getMypromoByType(id,type): Observable<{}> {
    return this.http.get(this.apiUrl+"/byUser/"+id+"/"+type).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMypromoAll(id): Observable<{}> {
    return this.http.get(this.apiUrl+"/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

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
