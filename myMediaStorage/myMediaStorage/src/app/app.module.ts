import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { YoutubeApiService } from './services/YouTube/youtube-api.service';
import { SavedMediaService } from './services/Saved-Media/saved-media.service';
import { YoutubePipe } from './pipes/youtube.pipe';
import { AlbumComponent } from './components/album/album.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    ProfileComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    YoutubePipe,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [YoutubeApiService, SavedMediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
