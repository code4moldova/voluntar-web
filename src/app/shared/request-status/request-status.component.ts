import { Component, Input, OnInit } from '@angular/core';
import { RequestStatus } from '@shared/models';

const TITLES = {
  new: 'nou',
  confirmed: 'confirmat',
  in_process: 'în lucru',
  canceled: 'anulat',
  solved: 'rezolvat',
  archived: 'arhivat',
};

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss'],
})
export class RequestStatusComponent implements OnInit {
  @Input()
  status: RequestStatus;
  statusTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.statusTitle = TITLES[this.status];
  }
}
