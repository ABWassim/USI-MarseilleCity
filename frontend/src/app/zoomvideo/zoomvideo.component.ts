import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../message.service';
import {environment} from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-zoomvideo',
  templateUrl: './zoomvideo.component.html',
  styleUrls: ['./zoomvideo.component.scss']
})


export class ZoomvideoComponent implements OnInit {
  concat = this.route.snapshot.paramMap.get('id');
  videozoom: any;
  newUrlVideo: string = '';
  splitted = this.concat.split('___', 2);
  idVideo = this.splitted[0];
  provide = this.splitted[1];
  url: SafeResourceUrl;
  playlists: string[] = [];

  urlAdd = '';
  titleAdd = '';
  descriptionAdd = '';
  showContent = true;

  constructor(private msgservice: MessageService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private router: Router){}

  ngOnInit(): void {
    this.tryShowAdd();
    const data = {
      id: this.idVideo,
      provider : this.provide
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideoById', data).subscribe(
      reponse => {
        this.videozoom = reponse.data;
        this.videozoom.date = (this.videozoom.date.split('T'))[0];
        const times = this.videozoom.date.split('-');
        this.videozoom.date = times[2] + '-' + times[1] + '-' + times[0];

        if (this.provide === 'youtube'){
          this.newUrlVideo = 'https://www.youtube.com/embed/' + this.videozoom.id;
        }
        else {
          this.newUrlVideo = 'https://player.vimeo.com/video/' + this.videozoom.id;
        }
        console.log(this.newUrlVideo);
      }
    );
    this.url = this.getSafeURL();

    this.msgservice.sendMessage( environment.debutUrlPlaylist + '/getPlaylists', {}).subscribe(
      reponse => {
        this.playlists = reponse.data;
      }
    );
  }

  getSafeURL(): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.newUrlVideo);
  }

  addVideo(playlist: string): void {
    const data = {
      name: playlist,
      video: this.videozoom
    };
    this.msgservice.sendMessage( environment.debutUrlPlaylist + '/addVideo', data).subscribe(
      reponse => {
          console.log(reponse);
      }
    );
  }

  tryShowAdd(): void {
    const p = Math.floor(Math.random());
    if (p === 0){
      this.showContent = false;
      this.msgservice.sendMessage( environment.debutUrlAdverts + '/getRandomAdvert', {}).subscribe(
        reponse => {
          this.urlAdd = reponse.data.image;
          this.titleAdd = reponse.data.title;
          this.descriptionAdd = reponse.data.description;
        }
      );
    }
  }

  closeAdd(): void{
    this.showContent = true;
  }
}


