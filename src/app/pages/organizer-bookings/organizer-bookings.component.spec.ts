import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerBookingsComponent } from './organizer-bookings.component';

describe('OrganizerBookingsComponent', () => {
  let component: OrganizerBookingsComponent;
  let fixture: ComponentFixture<OrganizerBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
