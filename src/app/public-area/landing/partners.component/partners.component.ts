import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbCarouselConfig],
})
export class PartnersComponent implements AfterViewInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = false;
  }

  ngAfterViewInit() {
    this.carousel.pause();
  }
}
