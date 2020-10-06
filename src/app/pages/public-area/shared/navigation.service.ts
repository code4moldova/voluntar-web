import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly formularUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeOMOaAwXeMyWA6RC6yZtSSIAblaE1yhHz0rsDrTRsruXLXHg/viewform?fbclid=IwAR2Q-AYsGP7_IX_LGKX9nHNOzPqnM9NFNp8dKhIhUrTpwSeLqS_8vcqdfug';

  readonly whoNeedsHelpSectionId = 'who-needs-help';
  readonly whoCanHelpSectionId = 'who-can-help';
  readonly makeDonationSectionId = 'make-donation';

  /**
   * TODO: to be removed after implementing "Get help" contact form
   * `whoNeedsHelpSectionId` part is needed for correct in-page navigation
   */
  readonly hotLineSectionId = this.whoNeedsHelpSectionId + '-hot-line';
}
