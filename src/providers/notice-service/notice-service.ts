import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class NoticeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NoticeServiceProvider Provider');
  }

  private apiUrl_notification = 'http://muffinman.xyz/api/notification';

  getNotice(id,status): Observable<{}> {
    return this.http.get(this.apiUrl_notification+"/all/"+id+"/"+status).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateNotice(id): Observable<{}> {
    return this.http.get(this.apiUrl_notification+"/read/"+id).pipe(
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
