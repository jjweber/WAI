import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SavedMediaService {

  private _getUrl = '/api/videos';
  constructor(private _http: Http) { }

  getVideos() {
    return this._http.get(this._getUrl)
    .map((response: Response) => response.json());
  }
/*
  saveVideo(data: Video): Observable<string[]> {
    const headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/videos/', JSON.stringify(data), {
      headers: headers
    }).map((res) => res.json().data);
  }
*/
}
