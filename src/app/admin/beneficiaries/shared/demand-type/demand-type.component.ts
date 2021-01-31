import { Component, Input, OnInit } from '@angular/core';
import { DemandType } from '@demands/shared/demand-type';

const TITLES = {
  warm_lunch: 'Prînz Cald',
  grocery: 'Produse Alimentare',
  medicine: 'Medicamente',
};

@Component({
  selector: 'app-demand-type',
  templateUrl: './demand-type.component.html',
  styleUrls: ['./demand-type.component.scss'],
})
export class DemandTypeComponent implements OnInit {
  @Input()
  type: DemandType;
  typeTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.typeTitle = TITLES[this.type];
  }
}
