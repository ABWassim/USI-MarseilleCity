import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdvertDialogComponent } from './delete-advert-dialog.component';

describe('DeleteAdvertDialogComponent', () => {
  let component: DeleteAdvertDialogComponent;
  let fixture: ComponentFixture<DeleteAdvertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdvertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdvertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
