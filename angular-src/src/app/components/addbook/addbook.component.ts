import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  titleFormControl = new FormControl();
  isbnFormControl = new FormControl();
  pageCountFormControl = new FormControl();
  shortDescriptionFormControl = new FormControl();
  authorsFormControl = new FormControl();
  noOfCopysFormControl = new FormControl();


  // title: String;
  // isbn: Number;
  // pagecount: Number;
  // shortdescription: String;
  // authors: String;
  // noofcopys: Number;

  constructor(
    private validateService: ValidateService, 
    private ngsnotifyService:NgsnotifyService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onBookSubmit(){

    const book = {
      // title: this.title,
      // isbn: this.isbn,
      // pageCount: this.pagecount,
      // shortDescription: this.shortdescription,
      // authors: this.authors,
      // numberOfCopys: this.noofcopys,
      // copysLeft: this.noofcopys

      title: this.titleFormControl.value,
      isbn: this.isbnFormControl.value,
      pageCount: this.pageCountFormControl.value,
      shortDescription: this.shortDescriptionFormControl.value,
      authors: this.authorsFormControl.value,
      numberOfCopys: this.noOfCopysFormControl.value,
      copysLeft: this.noOfCopysFormControl.value
    }

    // Required Fields
    if(!this.validateService.validateAddBook(book)){
      this.ngsnotifyService.onWarning('Please fill required fields','Warning');
      return false;
    }

    // Validate Number Fields
    if(!this.validateService.validateBookNumberFields(book)){
      this.ngsnotifyService.onWarning('String is not valid for number fields','Warning');
      return false;
    }

    // Add book
    this.authService.addBook(book).subscribe(data => {
      if(data.success){
        this.ngsnotifyService.onSuccess('Book added successfully!','Success');
        this.titleFormControl.setValue("");
        this.isbnFormControl.setValue("");
        this.pageCountFormControl.setValue("");
        this.shortDescriptionFormControl.setValue("");
        this.authorsFormControl.setValue("");
        this.noOfCopysFormControl.setValue("");
      } else {
        this.ngsnotifyService.onError('Something went wrong','Error');
      }
    });
    
  }

}
