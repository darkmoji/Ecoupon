import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransactionServiceProvider {

  private apiUrl_logUp = 'http://muffinman.xyz/api/logUp';

  constructor(public http: HttpClient) {
    console.log('Hello TransactionServiceProvider Provider');
  }

  getDay(date): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/day/'+date).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUse(date,id_shop): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/use/'+date+'/'+id_shop).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getGive(date,id_shop): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/give/'+date+'/'+id_shop).pipe(
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
