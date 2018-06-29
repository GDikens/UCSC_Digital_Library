import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
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
  searchTerm$ = new Subject<string>();

  bookid: String;
  userid: String;
  date: String;
  time: String;
  title: String;


  constructor(
    private dataservice: DataService,
    private authservice: AuthService
  ) { 
    this.authservice.bookSearch(this.searchTerm$).subscribe(results => {
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
  }

  onReserveSubmit(){
    console.log(this.bookidFormControl.value);
  }

}