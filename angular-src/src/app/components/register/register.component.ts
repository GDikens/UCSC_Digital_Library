import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private ngsnotifyService:NgsnotifyService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.ngsnotifyService.onWarning('Please fill in all fields','Warning');
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.ngsnotifyService.onWarning('Please use a valid email','Warning');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.ngsnotifyService.onSuccess('User registered successfully!','Success');
        this.router.navigate(['/register']);
      } else {
        this.ngsnotifyService.onError(data.msg,'Error');
        this.router.navigate(['/register']);
      }
    });
    
  }

}
