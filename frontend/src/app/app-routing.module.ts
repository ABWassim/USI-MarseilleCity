import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';
import { SearchComponent } from './search/search.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserComponent } from './user/user.component';
import { PlaylistpageComponent } from './playlistpage/playlistpage.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { InscriptionAnnonceurComponent } from './inscription-annonceur/inscription-annonceur.component';
import { AdvertspageComponent } from './advertspage/advertspage.component';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { AdminComponent } from './admin/admin.component';
import {UserGuard} from './user.guard';
import {AdvertGuard} from './advert.guard';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path : 'inscription', component : InscriptionComponent},
  {path : 'inscriptionAnnonceur', component : InscriptionAnnonceurComponent},

  {path : 'video/:id', component : ZoomvideoComponent, canActivate: [UserGuard]},
  {path : 'search', component : SearchComponent, canActivate: [UserGuard]},
  {path : 'playlistpage', component : PlaylistpageComponent, canActivate: [UserGuard]},
  {path : 'userpage', component : UserComponent, canActivate: [UserGuard]},
  {path : 'playlist/:playlist', component : PlaylistComponent, canActivate: [UserGuard]},

  {path : 'advertspage', component : AdvertspageComponent, canActivate: [AdvertGuard]},
  {path : 'advertiserpage', component : AdvertiserComponent, canActivate: [AdvertGuard]},

  {path : 'adminpage', component : AdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
