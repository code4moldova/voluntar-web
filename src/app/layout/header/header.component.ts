import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserFacadeService } from 'src/app/services/auth/user-facade.service';
import { map } from 'rxjs/operators';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';

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
    private userFacade: UserFacadeService,
    private requestsFacade: RequestsFacadeService
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
