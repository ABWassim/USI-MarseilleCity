import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
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
import { EditPlaylistDialogComponent } from './edit-playlist-dialog/edit-playlist-dialog.component';
import { DeletePlaylistComponent } from './delete-playlist/delete-playlist.component';
import { DeletePlaylistDialogComponent } from './delete-playlist-dialog/delete-playlist-dialog.component';
import { DeleteVideoComponent } from './delete-video/delete-video.component';
import { DeleteVideoDialogComponent } from './delete-video-dialog/delete-video-dialog.component';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AnnonceComponent } from './annonce/annonce.component';
import { InscriptionAnnonceurComponent } from './inscription-annonceur/inscription-annonceur.component';
import { NavbarAdvertComponent } from './navbar-advert/navbar-advert.component';
import { AdvertspageComponent } from './advertspage/advertspage.component';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { DeleteAdvertComponent } from './delete-advert/delete-advert.component';
import { DeleteAdvertDialogComponent } from './delete-advert-dialog/delete-advert-dialog.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { EditAdvertDialogComponent } from './edit-advert-dialog/edit-advert-dialog.component';
import { CreateAdvertDialogComponent } from './create-advert-dialog/create-advert-dialog.component';
import { CreateAdvertComponent } from './create-advert/create-advert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ZoomvideoComponent,
    SearchComponent,
    InscriptionComponent,
    UserComponent,
    PlaylistpageComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    CreatePlaylistDialogComponent,
    EditPlaylistDialogComponent,
    DeletePlaylistComponent,
    DeletePlaylistDialogComponent,
    DeleteVideoComponent,
    DeleteVideoDialogComponent,
    EditPlaylistComponent,
    AnnonceComponent,
    InscriptionAnnonceurComponent,
    NavbarAdvertComponent,
    AdvertspageComponent,
    AdvertiserComponent,
    DeleteAdvertComponent,
    DeleteAdvertDialogComponent,
    EditAdvertComponent,
    EditAdvertDialogComponent,
    CreateAdvertDialogComponent,
    CreateAdvertComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
