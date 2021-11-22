import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { VideoComponent } from './video/video.component';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';
import { SearchComponent } from './search/search.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserComponent } from './user/user.component';
import { PlaylistpageComponent } from './playlistpage/playlistpage.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DeletePlaylistComponent } from './delete-playlist/delete-playlist.component';
import { DeletePlaylistDialogComponent } from './delete-playlist-dialog/delete-playlist-dialog.component';
import { DeleteVideoComponent } from './delete-video/delete-video.component';
import { DeleteVideoDialogComponent } from './delete-video-dialog/delete-video-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    VideoComponent,
    ZoomvideoComponent,
    SearchComponent,
    InscriptionComponent,
    UserComponent,
    PlaylistpageComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    CreatePlaylistDialogComponent,
    DeletePlaylistComponent,
    DeletePlaylistDialogComponent,
    DeleteVideoComponent,
    DeleteVideoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
