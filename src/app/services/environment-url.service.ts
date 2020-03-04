import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class EnvironmentUrlService {

public url:string = environment.urlAddress;
  constructor() { }

}