import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-safe-pipe',
  templateUrl: './safe-pipe.component.html',
  styleUrls: ['./safe-pipe.component.scss']
})

@Pipe({ name: 'safe' })
export class SafePipeComponent implements PipeTransform{

  constructor (private sanitizer: DomSanitizer) { }
    transform(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
