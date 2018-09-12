import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PromotionServiceProvider {

  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';
  private apiUrl_typromo = 'http://muffinman.xyz/api/typepromo';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';
  private apiUrl_member = 'http://muffinman.xyz/api/member';
  private apiUrl_shop = 'http://muffinman.xyz/api/shop';
  private apiUrl_logUp = 'http://muffinman.xyz/api/logUp';


  constructor(public http: HttpClient) {
    console.log('Hello PromotionServiceProvider Provider');
  }

  getShop(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/single/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  usePoint(id_shop,id_user,point): Observable<{}> {
    return this.http.get(this.apiUrl_member+"/usepoint/"+id_shop+"/"+id_user+"/"+point).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTypePromo(): Observable<{}> {
    return this.http.get(this.apiUrl_typromo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromoByType(id,type): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/byType/"+id+"/"+type).pipe(
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

  searchPromo(id): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/search/name/"+id).pipe(
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

  getLogUp(id): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+"/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postLog(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_logUp, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  postNotice(data): Observable<{}> {
    const body = data;
    return this.http.post(this.apiUrl_notification, body).pipe(
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
