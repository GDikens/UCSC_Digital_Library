import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  User:Object;

  constructor(
    private ngsnotifyService:NgsnotifyService,
    private validateService: ValidateService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.User = profile.user;
    },
    err => {
      console.log(err)
      return false;
    });
  }

}
