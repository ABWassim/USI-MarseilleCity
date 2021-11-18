import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';
import { SearchComponent } from './search/search.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserComponent } from './user/user.component';
import { PlaylistpageComponent } from './playlistpage/playlistpage.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'home', component : HomeComponent},
  {path : 'video/:id', component : ZoomvideoComponent},
  {path : 'search/:searchword', component :SearchComponent},
  {path : 'inscription', component :InscriptionComponent},
  {path : 'playlistpage', component :PlaylistpageComponent},
  {path : 'userpage', component :UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
