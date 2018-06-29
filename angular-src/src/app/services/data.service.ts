import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sidebarValueSource = new BehaviorSubject('addbook');
  private loadingStatus: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  
  currentSidebarValue = this.sidebarValueSource.asObservable();

  today = new Date();

  constructor() { }

  changeSidebarValue(value: string) {
    this.sidebarValueSource.next(value)
  }

  getCurrentDate(){
    var day = this.today.getDate().toString();
    var month = this.today.getMonth() + 1;
    var year = this.today.getFullYear().toString();

    var date = month.toString() + "/" + day + "/" + year;
    return date;
  }

  getCurrentTime(){
    var hours = this.today.getHours().toString();
    var minutes = this.today.getMinutes().toString();

    var time = hours + ":" + minutes;
    return time;
  }

  displayMatSpinner(value: boolean){
    this.loadingStatus.next(value);
  }

}
