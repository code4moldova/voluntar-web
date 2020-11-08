import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.scss'],
})
export class DisabilityComponent {
  @Input()
  disability: string;
  @Input()
  showLabel = true;
}
