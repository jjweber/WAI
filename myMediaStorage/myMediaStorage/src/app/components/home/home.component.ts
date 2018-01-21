import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { YoutubeApiService } from '../../services/YouTube/youtube-api.service';
import { SavedMediaService } from '../../services/Saved-Media/saved-media.service';

import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  youtubeData: any = [];
  videosList: any = [];
  filteredVideos: any [];
  selectedVideo: any = {
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      publishedAt: '',
  };
  videoStore: any = [];
  searchedTitle = 'Most Popular';

  constructor(private youtubeApiService: YoutubeApiService, private savedMediaService: SavedMediaService) {}

  ngOnInit() {
      this.youtubeApiService.getVideos()
      // Subscribing to the function to get access to its data.
      .subscribe((data) => {
          // console.log('Data: ', data);

          this.youtubeData = data.items;

          // console.log(this.youtubeData);
          for (const newData of this.youtubeData) {
              // console.log(newData.snippet);

              const videoModel: any = {
                  title: newData.snippet.title,
                  description: newData.snippet.description,
                  imageUrl: newData.snippet.thumbnails.high,
                  videoUrl: 'http://www.youtube.com/embed/' + newData.id,
                  publishedAt: newData.snippet.publishedAt,
              };
              this.videosList.push(videoModel);
          }

          console.log(this.videosList);
      });
  }

    // Function that is passed the data from the video that is clicked to populate the modal with correct video data.
    SelectVideo(video: any) {
        // Setting the passed article to the selectedArticle variable.
        this.selectedVideo = video;
        console.log(this.selectedVideo);
    }

    SaveVideo () {

        // Pushing the selectedArticle to my articleStore array.
        this.videoStore.push(this.selectedVideo);
        console.log('Pushing up saved video of: ', this.selectedVideo);

        // Calling setFavorites from favoritesService and passing it my articleStore array.
        // this.savedMediaService.saveVideo(this.videoStore);
        // console.log(localStorage);
    }

}
