import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-zoomvideo',
  templateUrl: './zoomvideo.component.html',
  styleUrls: ['./zoomvideo.component.scss']
})
export class ZoomvideoComponent implements OnInit {
  titleVideo = this.route.snapshot.paramMap.get('title');
  
  @Input()
  zoom_video : any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
