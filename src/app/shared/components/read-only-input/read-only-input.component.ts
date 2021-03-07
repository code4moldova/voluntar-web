import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-only-input',
  templateUrl: './read-only-input.component.html',
})
export class ReadOnlyInputComponent {
  @Input() value: string;
  @Input() label: string;
  @Input() title: string;
}
