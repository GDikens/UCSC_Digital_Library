import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgsnotifyService } from '../../services/ngsnotify.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-returnbook',
  templateUrl: './returnbook.component.html',
  styleUrls: ['./returnbook.component.css']
})
export class ReturnbookComponent implements OnInit {
  Reserve: Object;
  displayedColumns: string[] = ['select', 'title', 'date', 'time'];

  
  selection = new SelectionModel<ReservationInterface>(true, []);

  userid: String;

  constructor(
    private authService: AuthService,
    private ngsnotifyService:NgsnotifyService,
  ) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('user')).id
    this.authService.getReserveData(this.userid).subscribe(data => {
      //this.Reserve = data;
      const RESERVE_DATA: ReservationInterface[] = data;
      this.Reserve = new MatTableDataSource<ReservationInterface>(RESERVE_DATA);
      console.log(this.Reserve);
    },
    err => {
      console.log(err)
      return false;
    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Reserve.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.Reserve.data.forEach(row => this.selection.select(row));
  }

  onSubmitReturnBooks(){

    this.authService.returnBook(this.selection.selected).subscribe(data => {
      if(data.success){
        this.ngsnotifyService.onSuccess(data.msg,'Success');
        
      } else {
        this.ngsnotifyService.onError(data.msg,'Error');
      }
    });

  }

}

export interface ReservationInterface {
  bookId: string;
  date: string;
  time: string;
  userId: string;
  _id:String;
}
