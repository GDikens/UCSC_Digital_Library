import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private ngsnotifyService:NgsnotifyService,
    private validateService: ValidateService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  @HostListener('onLoginSubmit')
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data.msg);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.ngsnotifyService.onSuccess('You are logged in!','Success');
        this.router.navigate(['/dashboard']);
      } else {
        this.ngsnotifyService.onError(data.msg,'Error');
        this.router.navigate(['/login']);
      }
    });
  }
}
