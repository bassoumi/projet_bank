import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteComponent } from './modifier-compte.component';

describe('ModifierCompteComponent', () => {
  let component: ModifierCompteComponent;
  let fixture: ComponentFixture<ModifierCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCompteComponent]
    });
    fixture = TestBed.createComponent(ModifierCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
