import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionAnnonceurComponent } from './inscription-annonceur.component';

describe('InscriptionAnnonceurComponent', () => {
  let component: InscriptionAnnonceurComponent;
  let fixture: ComponentFixture<InscriptionAnnonceurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionAnnonceurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionAnnonceurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
