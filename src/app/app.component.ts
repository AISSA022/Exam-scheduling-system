import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-system';
  opened = false;
  greencolor = "#88b77b"
  ngOnInit(): void {
  }
}
