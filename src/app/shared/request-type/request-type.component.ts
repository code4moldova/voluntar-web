import { Component, Input, OnInit } from '@angular/core';
import { RequestType } from '@models/requests';

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
  type: RequestType;
  typeTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.typeTitle = TITLES[this.type];
  }
}
