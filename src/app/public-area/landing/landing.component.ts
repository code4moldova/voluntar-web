import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationService } from '../shared/navigation.service';

@Component({
  templateUrl: './landing.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  constructor(public navSvc: NavigationService) {}
}
