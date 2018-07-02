import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
  }

  sendSidebarValue(value){
    switch(value){
      case 1: 
        this.dataservice.changeSidebarValue("addbook");
        break;
      case 2:
        this.dataservice.changeSidebarValue("searchbook");
        break;
      case 3:
        this.dataservice.changeSidebarValue("reservebook");
        break;
      case 4:
        this.dataservice.changeSidebarValue("fines");
        break;
      case 5:
        this.dataservice.changeSidebarValue("returnbook");
    }
  }

}
