import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ManagePromoServiceProvider {

  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';
  private apiUrl_typepromo = 'http://muffinman.xyz/api/typepromo';
  private apiUrl_con = 'http://muffinman.xyz/api/condition';
  private apiUrl_typeAp = 'http://muffinman.xyz/api/typeAp';
  private apiUrl_branch = 'http://muffinman.xyz/api/branch';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';

  constructor(public http: HttpClient) {
    console.log('Hello ManagePromoServiceProvider Provider');
  }

  getTypePromo(): Observable<{}> {
    return this.http.get(this.apiUrl_typepromo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromoByShop(id,type): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/byShop/"+id+"/"+type).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getConditions(): Observable<{}> {
    return this.http.get(this.apiUrl_con).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPromo(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_promo, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getTypeAp(): Observable<{}> {
    return this.http.get(this.apiUrl_typeAp).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getBranchesByShop(id): Observable<{}> {
    return this.http.get(this.apiUrl_branch+"/byShop/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUnread(id, status): Observable<{}>{
    return this.http.get(this.apiUrl_notification+"/getunread/"+id+"/"+status).pipe(
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
