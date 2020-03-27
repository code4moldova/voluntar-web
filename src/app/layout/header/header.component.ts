import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDrawerClick() {
    this.toggle.emit();
  }

  onLogout() {
    console.log('logout');
  }
}
