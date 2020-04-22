import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[appGoBack]',
})
export class GoBackDirective {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('click', ['$event'])
  back(e) {
    e.preventDefault();
    // In Chrome history will always starts with 2
    // Because start page is included
    if (history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
