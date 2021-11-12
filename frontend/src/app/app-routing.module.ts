import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'home', component : HomeComponent},
  {path : 'video/:title', component : ZoomvideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
