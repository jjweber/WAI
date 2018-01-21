import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class YoutubeApiService {
  baseYTURL = 'https://www.googleapis.com/youtube/v3/videos?';
  part = 'snippet';
  // channelID  = 'UCPsopTKQfSgW9XdYkKA6Gdw';
  searchQuery= 'Webdesign';
  type = 'video';
  maxResults = 20;
  API_key    = 'AIzaSyB6fDbzn-_44vn0_zYHiVWkRnOL5xbhK60';

  constructor(private http: Http) {}

  getVideos() {

      // videoList = json_decode(file_get_contents('https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId='.$channelID.'&maxResults='.$maxResults.'&key='.$API_key.''));
      const videoList = this.baseYTURL + 'part=' + this.part + '&q=' + this.searchQuery + '&apiKey=' + this.API_key;

      const popularVideos = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&maxResults=20&key=AIzaSyB6fDbzn-_44vn0_zYHiVWkRnOL5xbhK60`;
      return this.http.get(popularVideos)
      // Mapping the results to json.
      .map((res: any) => res.json());
  }

}
