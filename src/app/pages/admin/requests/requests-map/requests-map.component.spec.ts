import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMapComponent } from './requests-map.component';

describe('RequestsMapComponent', () => {
  let component: RequestsMapComponent;
  let fixture: ComponentFixture<RequestsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
