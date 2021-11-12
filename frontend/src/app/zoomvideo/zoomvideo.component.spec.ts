import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomvideoComponent } from './zoomvideo.component';

describe('ZoomvideoComponent', () => {
  let component: ZoomvideoComponent;
  let fixture: ComponentFixture<ZoomvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomvideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
