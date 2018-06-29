import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  User:Object;

  constructor(
    private ngsnotifyService:NgsnotifyService,
    private authService:AuthService,
    private router:Router,
    //private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('user'));
    console.log(this.User);
    //console.log(this.jwtHelper.isTokenExpired());
  }

}
