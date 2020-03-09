import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentUrlService } from './../app/services/environment-url.service';
import { Jwt } from './jwt';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs'; 

@Injectable()
export class RepositoryService {

  constructor(private http:HttpClient, private envUrl:EnvironmentUrlService) { }

  public getData(route:string)
  {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.url));
  
  }

public post (route: string, body) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post(this.createCompleteRoute(route, this.envUrl.url), body, { headers, responseType: 'text'})
  .pipe(
      catchError(this.handleError)
    );
}
 
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, this.envUrl.url), body, this.generateHeaders());
  }
 
  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.url));
  }
 
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message

  if (error.status == 0){return throwError("Unknown error")};

  return throwError(
    
    error.error.replace("[","").replace("]","").replace('"','').replace('"',''));
};
}