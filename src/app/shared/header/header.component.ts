import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthFacade } from '../../auth/auth.facade';
import { map } from 'rxjs/operators';
import { RequestsFacade } from '../../admin/requests/requests.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  newRequest$ = this.requestsFacade.newRequests;
  user$ = this.userFacade.userData$;
  userName$ = this.user$.pipe(
    map((user) => (user ? user.first_name : 'User Name'))
  );
  @Output() toggle = new EventEmitter();

  constructor(
    private userFacade: AuthFacade,
    private requestsFacade: RequestsFacade
  ) {}

  ngOnInit(): void {}

  onDrawerClick() {
    this.toggle.emit();
  }

  onLogout() {
    console.log('logout');
    this.userFacade.logout();
  }

  fetchRequests() {
    this.requestsFacade.getRequests({ pageSize: 20, pageIndex: 1 });
    this.requestsFacade.resetNewRequests();
  }
}
