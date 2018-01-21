import { Video } from './../../video';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SavedMediaService } from '../../services/Saved-Media/saved-media.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  videos: Array<Video>;

  selectedVideo: Video;

  constructor(private _savedMediaService: SavedMediaService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._savedMediaService.getVideos()
    .subscribe(resVideoData => {
      this.videos = resVideoData;
      console.log(this.videos);
    });
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

}
