import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizersCreateComponent } from './organizers-create.component';

describe('OrganizersCreateComponent', () => {
  let component: OrganizersCreateComponent;
  let fixture: ComponentFixture<OrganizersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
