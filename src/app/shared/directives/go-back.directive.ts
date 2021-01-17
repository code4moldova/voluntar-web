import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

/**
 * https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
 */
@Directive({
  selector: '[appGoBack]',
})
export class GoBackDirective {
  private history: string[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  @HostListener('click', ['$event'])
  back(e) {
    e.preventDefault();
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      void this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
