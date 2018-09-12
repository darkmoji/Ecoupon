import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ActivityServiceProvider {

  private apiUrl_typeshop = 'http://muffinman.xyz/api/typeshop';
  private apiUrl_shop = 'http://muffinman.xyz/api/shop';
  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';
  private apiUrl_con = 'http://muffinman.xyz/api/condition';
  private apiUrl_bl = 'http://muffinman.xyz/api/branch_limited';
  private apiUrl_mypromo = 'http://muffinman.xyz/api/mypromo';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';
  private apiUrl_logUp = 'http://muffinman.xyz/api/logUp';

  constructor(public http: HttpClient) {
    console.log('Hello ActivityServiceProvider Provider');
  }

  //PromoDetailShopPage
  //PromoDetail2Page
  //PromoDetailPage
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

  //PromoDetail2Page
  //PromoDetailPage
  postNotice(data): Observable<{}> {
    const body = data;
    return this.http.post(this.apiUrl_notification, body).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  //PromoDetailPage
  postMypromo(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_mypromo, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getShop(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/goShop/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  //PromoDetail2Page
  getMypromo(id_promo, id_user): Observable<{}> {
    return this.http.get(this.apiUrl_mypromo+"/getmypromo/"+id_promo+"/"+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  usePoint(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_logUp, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getLogUp(id): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+"/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  //AddShopPage
  //SettingsPage
  getShopById(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/"+id).pipe(
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

  getTransGet(id_user,status): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/user/get/'+id_user+'/'+status).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTransUse(id_user): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/user/use/'+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  //AddShopPage
  getTypeshop(): Observable<{}> {
    return this.http.get(this.apiUrl_typeshop).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postShop(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_shop, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  editShop(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_shop+"/update", body,{responseType: 'text'}).pipe(
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
