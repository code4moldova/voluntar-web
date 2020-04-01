import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserFacadeService } from 'src/app/services/auth/user-facade.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$ = this.userFacade.userData$;
  userName$ = this.user$.pipe(
    map(user => (user ? user.first_name : 'User Name'))
  );
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
