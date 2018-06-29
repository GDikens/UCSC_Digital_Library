import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  sidebar: String;

  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.currentSidebarValue.subscribe(value => this.sidebar = value)
  }

}
