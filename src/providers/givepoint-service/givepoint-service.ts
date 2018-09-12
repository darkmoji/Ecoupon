import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GivepointServiceProvider {

  private apiUrl_branch = 'http://muffinman.xyz/api/branch';
  private apiUrl_user = 'http://muffinman.xyz/api/user';
  private apiUrl_mypromo = 'http://muffinman.xyz/api/mypromo';
  private apiUrl_logGp = 'http://muffinman.xyz/api/logGp';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';
  private apiUrl_member = 'http://muffinman.xyz/api/member';

  constructor(public http: HttpClient) {
    console.log('Hello GivepointServiceProvider Provider');
  }

    checkUser(data): Observable<{}> {
      const body = data;
      return this.http.post(this.apiUrl_user+"/givepoint/input", body).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    checkScan(data): Observable<{}> {
      const body = data;
      return this.http.post(this.apiUrl_user+"/givepoint", body).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    getUser(id): Observable<{}> {
      return this.http.get(this.apiUrl_user+"/"+id).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    getMember(id_shop, id_user): Observable<{}> {
      return this.http.get(this.apiUrl_member+"/check/"+id_shop+"/"+id_user).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    getMypromoShop(id_shop,id_user): Observable<{}> {
      return this.http.get(this.apiUrl_mypromo+"/givepoint/byShop/"+id_shop+"/"+id_user).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    postPoint(data): Observable<{}> {
      const body = data;
      return this.http.post(this.apiUrl_logGp, body).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }

    postMemPoint(data): Observable<{}> {
      const body = data;
      return this.http.post(this.apiUrl_logGp+"/member", body).pipe(
        map(this.extractData),
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
