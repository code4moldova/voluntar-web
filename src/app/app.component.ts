import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const icons = [
  'medicine',
  'deafmute',
  'archived',
  'export',
  'import',
  'plus',
  'map',
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
