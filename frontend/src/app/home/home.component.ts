import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchword: string= "";
  url: string="";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  affichage():void{
    this.url = "/search/" + this.searchword;
    this.router.navigateByUrl(this.url);
  }
}
