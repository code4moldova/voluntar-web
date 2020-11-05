import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.scss'],
})
export class DisabilityComponent implements OnInit {
  @Input()
  disability: string;
  @Input()
  showLabel = true;

  constructor() {}

  ngOnInit(): void {}
}
