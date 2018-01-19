import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { YoutubeApiService } from '../../services/youtube-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videosList: any = [];
  videos: any;

  constructor(private youtubeApiService: YoutubeApiService) { }

  ngOnInit() {
    this.youtubeApiService.getVideos()
    // Subscribing to the function to get access to its data.

    .subscribe((data) => {
      console.log('Data: ', data);
      this.videosList = data.items;

      console.log(this.videosList);
    });  
  }

}
