import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCompteComponent } from './creation-compte.component';

describe('CreationCompteComponent', () => {
  let component: CreationCompteComponent;
  let fixture: ComponentFixture<CreationCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationCompteComponent]
    });
    fixture = TestBed.createComponent(CreationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
