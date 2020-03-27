import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersDetailsComponent } from './volunteers-details.component';

describe('VolunteersDetailsComponent', () => {
  let component: VolunteersDetailsComponent;
  let fixture: ComponentFixture<VolunteersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
