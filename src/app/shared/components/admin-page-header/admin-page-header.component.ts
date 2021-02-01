import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  templateUrl: './admin-page-header.component.html',
})
export class AdminPageHeaderComponent {
  @Input()
  editLink: any[] | string | null | undefined;
  @Input()
  title: string;
  @Input()
  addBtnLabel: string;
  @Output()
  addCallback = new EventEmitter<any>();
  @Output()
  importCallback = new EventEmitter<any>();
  @Output()
  exportCallback = new EventEmitter<any>();
}
