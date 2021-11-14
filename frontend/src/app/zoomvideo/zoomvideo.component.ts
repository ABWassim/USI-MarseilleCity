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
  splitted = this.concat.split('-', 2);
  idVideo = this.splitted[0];
  provide = this.splitted[1];
  url: SafeResourceUrl;

  constructor(private msgservice: MessageService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const data = {
      id: this.idVideo,
      provider : this.provide
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideoById', data).subscribe(
      reponse => {
        this.videozoom = reponse.data;
        if (this.provide === 'youtube'){
          this.newUrlVideo = 'https://www.youtube.com/embed/' + this.videozoom.id;
        }
        else {
          this.newUrlVideo = 'https://player.vimeo.com/video/' + this.videozoom.id;
        }
        console.log(this.newUrlVideo);
      }
    );
  }

  getSafeURL(): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.newUrlVideo);
}
}
