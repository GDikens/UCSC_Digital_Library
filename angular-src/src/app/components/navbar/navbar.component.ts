import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  User:Object;

  constructor(
    private ngsnotifyService:NgsnotifyService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('user'));
    console.log(this.User);
  }

  onLogoutClick(){
    this.authService.logout();
    this.ngsnotifyService.onSuccess('You are logged out','Success');
    this.router.navigate(['/login']);
    return false;
  }

}
