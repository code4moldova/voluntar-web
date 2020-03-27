import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersListComponent } from './volunteers-list.component';

describe('VolunteersListComponent', () => {
  let component: VolunteersListComponent;
  let fixture: ComponentFixture<VolunteersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
