import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbCarouselConfig]
})

export class PartnersComponent {

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = false;
  }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngAfterViewInit() {
    this.carousel.pause();
  }
}