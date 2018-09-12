import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ReportServiceProvider {

  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';

  constructor(public http: HttpClient) {
    console.log('Hello ReportServiceProvider Provider');
  }

  getReport(date): Observable<{}> {
    return this.http.get(this.apiUrl_promo+'/report/'+date).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShop(type,date): Observable<{}> {
    return this.http.get(this.apiUrl_promo+'/report2/'+type+'/'+date).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromo(type,date,id_shop): Observable<{}> {
    return this.http.get(this.apiUrl_promo+'/report3/'+type+'/'+date+'/'+id_shop).pipe(
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
