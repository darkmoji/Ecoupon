import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ManageAccountServiceProvider {

  private apiUrl_branch = 'http://muffinman.xyz/api/branch';
  private apiUrl_member = 'http://muffinman.xyz/api/member';
  private apiUrl_user = 'http://muffinman.xyz/api/user';
  private apiUrl_notification = 'http://muffinman.xyz/api/notification';
  private apiUrl_logUp = 'http://muffinman.xyz/api/logUp';

  constructor(public http: HttpClient) {
    console.log('Hello ManageAccountServiceProvider Provider');
  }

  getMem(id_user): Observable<{}> {
    return this.http.get(this.apiUrl_user+"/"+id_user).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMember(id_shop): Observable<{}> {
    return this.http.get(this.apiUrl_member+"/shop/"+id_shop).pipe(
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

  getBranchById(id): Observable<{}> {
    return this.http.get(this.apiUrl_branch+"/byId/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postBranch(obj): Observable<{}> {
    const body = obj;
    return this.http.post(this.apiUrl_branch, body,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getUnread(id, status): Observable<{}>{
    return this.http.get(this.apiUrl_notification+"/getunread/"+id+"/"+status).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTranGive(id_shop): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/shop/give/'+id_shop).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTranUse(id_user,status): Observable<{}> {
    return this.http.get(this.apiUrl_logUp+'/trans/shop/use/'+id_user+'/'+status).pipe(
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
