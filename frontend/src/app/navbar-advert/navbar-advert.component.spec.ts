import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdvertComponent } from './navbar-advert.component';

describe('NavbarAdvertComponent', () => {
  let component: NavbarAdvertComponent;
  let fixture: ComponentFixture<NavbarAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
