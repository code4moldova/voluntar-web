import { Component, Input, OnInit } from '@angular/core';
import { DemandStatus } from '@demands/shared/demand-status';

const TITLES = {
  new: 'nou',
  confirmed: 'confirmat',
  in_process: 'în lucru',
  canceled: 'anulat',
  solved: 'rezolvat',
  archived: 'arhivat',
};

@Component({
  selector: 'app-demand-status',
  templateUrl: './demand-status.component.html',
  styleUrls: ['./demand-status.component.scss'],
})
export class DemandStatusComponent implements OnInit {
  @Input()
  status: DemandStatus;
  statusTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.statusTitle = TITLES[this.status];
  }
}
