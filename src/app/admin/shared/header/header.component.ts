import { Component } from '@angular/core';
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
  userName$ = this.userFacade.userData$.pipe(
    map((user) => (user ? user.first_name : 'User Name'))
  );

  links = [
    {
      label: 'Requests',
      link: './requests',
    },
    {
      label: 'Beneficiaries',
      link: './beneficiaries',
    },
    {
      label: 'Volunteers',
      link: './volunteers',
    },
    {
      label: 'Users',
      link: './users',
    },
  ];

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
