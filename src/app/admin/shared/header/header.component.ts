import { Component, EventEmitter, Output } from '@angular/core';
import { AuthFacade } from '@auth/auth.facade';
import { map } from 'rxjs/operators';
import { RequestsFacade } from '@requests/requests.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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

  onLogout() {
    this.userFacade.logout();
  }

  fetchRequests() {
    this.requestsFacade.getRequests({ pageSize: 20, pageIndex: 1 });
    this.requestsFacade.resetNewRequests();
  }
}
