import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FindshopServiceProvider {

  private apiUrl_shop = 'http://muffinman.xyz/api/shop';
  private apiUrl_promo = 'http://muffinman.xyz/api/promotion';
  private apiUrl_typepromo = 'http://muffinman.xyz/api/typepromo';
  private apiUrl_member = 'http://muffinman.xyz/api/member';
  private apiUrl_branch = 'http://muffinman.xyz/api/branch';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';

  constructor(public http: HttpClient) {
    console.log('Hello FindshopServiceProvider Provider');
  }

  getBrachAll(id): Observable<{}> {
    return this.http.get(this.apiUrl_branch+"/byShop/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  checkMember(id_shop, id_user): Observable<{}> {
    return this.http.get(this.apiUrl_member+"/check/"+id_shop+"/"+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postMember(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_member, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  deleteMember(id_shop, id_user): Observable<{}> {
    return this.http.get(this.apiUrl_member+"/delete/"+id_shop+"/"+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShopAll(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/byUser/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTypePromo(): Observable<{}> {
    return this.http.get(this.apiUrl_typepromo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromo(id_shop,type,id_user): Observable<{}> {
    return this.http.get(this.apiUrl_promo+"/findshop/byShop/"+id_shop+"/"+type+"/"+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  searchShop(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/search/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShopById(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getShopAllMap(id): Observable<{}> {
    return this.http.get(this.apiUrl_shop+"/all/byUser/"+id).pipe(
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
