import { FocusMonitor } from '@angular/cdk/a11y'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { Component, ElementRef, HostBinding, Input, OnInit, Optional } from '@angular/core'
import { FormBuilder, FormGroup, NgControl } from '@angular/forms'
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field'
import { Subject } from 'rxjs'
class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}

@Component({
  selector: 'form-hours-selector',
  template: './form-hours-selector.component.html',
  styles: ['./form-hours-selector.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FormHoursSelectorComponent }]
})
export class FormHoursSelectorComponent implements MatFormFieldControl<MyTel> {
  parts: FormGroup
  stateChanges = new Subject<void>()
  static nextId = 0
  ngControl: NgControl = null
  focused = false
  errorState = false
  controlType = 'form-hours-selector'

  constructor(
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() public parentFormField: MatFormField
  ) {
    this.parts = fb.group({
      area: '',
      exchange: '',
      subscriber: ''
    })
    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin
      this.stateChanges.next()
    })
  }

  @HostBinding() id = `form-hours-selector-${FormHoursSelectorComponent.nextId++}`

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty
  }

  @Input('aria-describedby') userAriaDescribedBy: string

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector('.form-hours-selector-container')!
    controlElement.setAttribute('aria-describedby', ids.join(' '))
  }

  @Input()
  get required() {
    return this._required
  }
  set required(req) {
    this._required = coerceBooleanProperty(req)
    this.stateChanges.next()
  }
  private _required = false

  @Input()
  get disabled(): boolean {
    return this._disabled
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value)
    this._disabled ? this.parts.disable() : this.parts.enable()
    this.stateChanges.next()
  }
  private _disabled = false

  @Input()
  get value(): MyTel | null {
    let n = this.parts.value
    if (n.area.length == 3 && n.exchange.length == 3 && n.subscriber.length == 4) {
      return new MyTel(n.area, n.exchange, n.subscriber)
    }
    return null
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '')
    this.parts.setValue({ area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber })
    this.stateChanges.next()
  }

  @Input()
  get placeholder() {
    return this._placeholder
  }
  set placeholder(plh) {
    this._placeholder = plh
    this.stateChanges.next()
  }
  private _placeholder: string

  get empty() {
    let n = this.parts.value
    return !n.area && !n.exchange && !n.subscriber
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus()
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete()
    this.fm.stopMonitoring(this.elRef.nativeElement)
  }
}
