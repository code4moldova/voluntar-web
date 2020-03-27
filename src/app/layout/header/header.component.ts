import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserFacadeService } from 'src/app/services/auth/user-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();

  constructor(private userFacade: UserFacadeService) {}

  ngOnInit(): void {}

  onDrawerClick() {
    this.toggle.emit();
  }

  onLogout() {
    console.log('logout');
    this.userFacade.logout();
  }
}
