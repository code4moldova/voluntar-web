import { Component, Input, OnInit } from '@angular/core';
import { DemandType } from '@demands/shared/demand-type';

const TITLES = {
  warm_lunch: 'Prînz Cald',
  grocery: 'Produse Alimentare',
  medicine: 'Medicamente',
};

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss'],
})
export class RequestTypeComponent implements OnInit {
  @Input()
  type: DemandType;
  typeTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.typeTitle = TITLES[this.type];
  }
}
