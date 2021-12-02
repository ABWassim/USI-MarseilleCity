import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertDialogComponent } from './edit-advert-dialog.component';

describe('EditAdvertDialogComponent', () => {
  let component: EditAdvertDialogComponent;
  let fixture: ComponentFixture<EditAdvertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
