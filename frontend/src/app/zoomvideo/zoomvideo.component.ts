import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../message.service';
import { VideoComponent } from '../video/video.component';
import {environment} from '../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { SafePipeComponent } from '../safe-pipe/safe-pipe.component';

@Component({
  selector: 'app-zoomvideo',
  templateUrl: './zoomvideo.component.html',
  styleUrls: ['./zoomvideo.component.scss']
})


export class ZoomvideoComponent implements OnInit {
  concat = this.route.snapshot.paramMap.get('id');
  videozoom: any;
  newUrlVideo: string = "";
  splitted = this.concat.split("-", 2); 
  idVideo = this.splitted[0];
  provide = this.splitted[1];
  url: SafeResourceUrl;


  constructor(private msgservice: MessageService, private route: ActivatedRoute, private safepipe: SafePipeComponent) { }

  ngOnInit(): void {
    const data = {
      id: this.idVideo,
      provider : this.provide
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideoById', data).subscribe(
      reponse => {
        this.videozoom = reponse.data;
        if (this.provide == "youtube"){
          this.newUrlVideo = "https://www.youtube.com/embed/" + this.videozoom.id;
          this.url= this.safepipe.transform(this.newUrlVideo);
        }
        else{
          this.newUrlVideo = "https://player.vimeo.com/video/" + this.videozoom.id;
          this.url= this.safepipe.transform(this.newUrlVideo);
        }
        console.log(this.newUrlVideo);
      }
    );
  }
}
