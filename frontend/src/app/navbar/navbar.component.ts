import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserqueryService} from "../userquery.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userquery: UserqueryService) { }

  ngOnInit(): void {
  }

  homePage(): void{
    this.userquery.query = '';
    this.userquery.pageNumber = -1;
    this.router.navigateByUrl('/search');
  }
}
