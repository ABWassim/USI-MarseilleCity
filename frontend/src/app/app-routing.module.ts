import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';
import { SearchComponent } from './search/search.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserComponent } from './user/user.component';
import { PlaylistpageComponent } from './playlistpage/playlistpage.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path : 'video/:id', component : ZoomvideoComponent},
  {path : 'search', component : SearchComponent},
  {path : 'inscription', component : InscriptionComponent},
  {path : 'playlistpage', component : PlaylistpageComponent},
  {path : 'userpage', component : UserComponent},
  {path : 'playlist/:playlist', component : PlaylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
