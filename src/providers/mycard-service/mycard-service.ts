import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MycardServiceProvider {

  private apiUrl_typromo = 'http://muffinman.xyz/api/typepromo';
  private apiUrl_mypromo = 'http://muffinman.xyz/api/mypromo';
  private apiUrl_member = 'http://muffinman.xyz/api/member';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';

  constructor(public http: HttpClient) {
    console.log('Hello MycardServiceProvider Provider');
  }
  
  getTypePromo(): Observable<{}> {
    return this.http.get(this.apiUrl_typromo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMypromoByType(id,type): Observable<{}> {
    return this.http.get(this.apiUrl_mypromo+"/byType/"+id+"/"+type).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMypromoAll(id): Observable<{}> {
    return this.http.get(this.apiUrl_mypromo+"/all/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMemberAll(id): Observable<{}> {
    return this.http.get(this.apiUrl_member+"/all/"+id).pipe(
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
