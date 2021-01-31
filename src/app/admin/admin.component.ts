import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DemandsFacade } from '@demands/demands.facade';

@Component({
  templateUrl: './admin.component.html',
  animations: [
    trigger('show', [
      state(
        'collapsed',
        style({ opacity: '0', top: '40px', visibility: 'hidden' }),
      ),
      state(
        'expanded',
        style({ opacity: '1', top: '70px', visibility: 'visible' }),
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class AdminComponent implements OnInit {
  constructor(private demandsFacade: DemandsFacade) {}

  ngOnInit() {
    this.demandsFacade.toggleNewRequestsPolling(true);
  }
}
