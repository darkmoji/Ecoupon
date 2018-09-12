import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DataServiceProvider {

  private apiUrl_logGp = 'http://muffinman.xyz/api/logGp';
  private apiUrl_typeshop = 'http://muffinman.xyz/api/typeshop';
  private apiUrl_user = 'http://muffinman.xyz/api/user';
  private apiUrl_shop = 'http://muffinman.xyz/api/shop';
  private apiUrl_branch = 'http://muffinman.xyz/api/branch';
  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';
  private apiUrl_con = 'http://muffinman.xyz/api/condition';
  private apiUrl_bl = 'http://muffinman.xyz/api/branch_limited';

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  getLogAll(): Observable<{}> {
    return this.http.get(this.apiUrl_logGp+'/all').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTypeShop(): Observable<{}> {
    return this.http.get(this.apiUrl_typeshop+'/all').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<{}> {
    return this.http.get(this.apiUrl_user+'/all').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShop(): Observable<{}> {
    return this.http.get(this.apiUrl_shop+'/all/admin').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addTypeShop(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_typeshop, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  editTypeShop(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_typeshop+"/update", body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  activeTypeShop(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_typeshop+"/active", body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getBrachAll(id): Observable<{}> {
    return this.http.get(this.apiUrl_branch+"/byShop/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShopById(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/single/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromoByshop(id): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/byShopAdmin/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getbranchLimited(id): Observable<{}> {
    return this.http.get(this.apiUrl_bl+"/byPromo/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDeCon(id): Observable<{}> {
    return this.http.get(this.apiUrl_con+"/byPromo/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromoById(id): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUserById(id, mode): Observable<{}> {
    return this.http.get(this.apiUrl_user+"/byIdAdmin/"+id+"/"+mode).pipe(
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
