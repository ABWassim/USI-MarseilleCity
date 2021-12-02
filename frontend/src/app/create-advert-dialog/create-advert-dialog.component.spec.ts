import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvertDialogComponent } from './create-advert-dialog.component';

describe('CreateAdvertDialogComponent', () => {
  let component: CreateAdvertDialogComponent;
  let fixture: ComponentFixture<CreateAdvertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdvertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
