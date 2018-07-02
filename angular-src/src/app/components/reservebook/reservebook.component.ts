import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { ValidateService } from '../../services/validate.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-reservebook',
  templateUrl: './reservebook.component.html',
  styleUrls: ['./reservebook.component.css']
})
export class ReservebookComponent implements OnInit {
  
  bookidFormControl = new FormControl();
  useridFormControl = new FormControl({ value: 'n/a', disabled: true });
  dateFormControl = new FormControl({ value: 'n/a', disabled: true });
  timeFormControl = new FormControl({ value: 'n/a', disabled: true });

  Results = [];
  Reservations = [];
  searchTerm$ = new Subject<string>();

  bookid: String;
  userid: String;
  today: number = Date.now();
  time: String;
  title: String;



  constructor(
    private dataservice: DataService,
    private authService: AuthService,
    private ngsnotifyService:NgsnotifyService,
    private validateService: ValidateService,
  ) { 
    this.authService.bookSearch(this.searchTerm$).subscribe(results => {
      this.Results = results;
      console.log(this.Results);
      // console.log(this.myControl.value);
    });

  }

  ngOnInit() {
    this.dataservice.displayMatSpinner(false);
    this.userid = JSON.parse(localStorage.getItem('user')).id;
    this.useridFormControl.setValue(this.userid);
    // this.useridFormControl(this.userid);
    // this.form.setValue({
    //   bookidFormControl: '',
    //   useridFormControl: this.userid,
    this.dateFormControl.setValue(this.dataservice.getCurrentDate()); 
    this.timeFormControl.setValue(this.dataservice.getCurrentTime());
    // this.bookidFormControl.setValue();
    // });
    // console.log(this.today);
    this.authService.getReservations(this.userid).subscribe(reservations => {
      this.Reservations = reservations;
      // console.log(reservations);
      console.log(this.Reservations);
    });
    console.log(this.today);
  }

  onReserveSubmit(){
    const reserve = {
      userId: this.useridFormControl.value,
      bookId: this.bookidFormControl.value,
      date: this.dateFormControl.value,
      time: this.timeFormControl.value
    }

    // Required Fields
    if(!this.validateService.validateReserveBook(reserve)){
      this.ngsnotifyService.onWarning('Please fill required fields','Warning');
      return false;
    }

    // Add book
    this.authService.addReserve(reserve).subscribe(data => {
      if(data.success){
        this.ngsnotifyService.onSuccess(data.msg,'Success');
        
      } else {
        this.ngsnotifyService.onError(data.msg,'Error');
      }
    });

    console.log(this.bookidFormControl.value);
  }

}