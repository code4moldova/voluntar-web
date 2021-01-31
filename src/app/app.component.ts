import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const icons = [
  'archived',
  'blind_weak_seer',
  'copilot',
  'correct',
  'deafmute',
  'deaf_mute',
  'delivery',
  'disability',
  'export',
  'grocery',
  'import',
  'incorrect',
  'invoices',
  'map',
  'mask',
  'medicine',
  'operator',
  'packing',
  'plus',
  'supply',
  'transport',
  'warm_lunch',
  'selection-dot',
] as const;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    icons.forEach((icon) => {
      const url = `../assets/icons/${icon}.svg`;
      const resourceUrl = domSanitizer.bypassSecurityTrustResourceUrl(url);
      iconRegistry.addSvgIcon(icon, resourceUrl);
    });
  }
}
