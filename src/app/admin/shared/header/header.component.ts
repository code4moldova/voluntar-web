import { Component } from '@angular/core';
import { AuthFacade } from '@auth/auth.facade';
import { map } from 'rxjs/operators';
import { DemandsFacade } from '@demands/demands.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  newDemands$ = this.demandsFacade.newDemands;
  userName$ = this.userFacade.userData$.pipe(
    map((user) => (user ? user.first_name : 'User Name')),
  );

  links = ['demands', 'beneficiaries', 'volunteers', 'users'].map((entity) => ({
    labelKey: entity,
    link: `./${entity}`,
  }));

  constructor(
    private userFacade: AuthFacade,
    private demandsFacade: DemandsFacade,
  ) {}

  onLogout() {
    this.userFacade.logout();
  }

  fetchDemands() {
    this.demandsFacade.getDemands({ pageSize: 20, pageIndex: 1 });
    this.demandsFacade.resetNewDemands();
  }
}
