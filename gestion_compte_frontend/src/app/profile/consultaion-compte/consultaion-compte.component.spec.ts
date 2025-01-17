import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaionCompteComponent } from './consultaion-compte.component';

describe('ConsultaionCompteComponent', () => {
  let component: ConsultaionCompteComponent;
  let fixture: ComponentFixture<ConsultaionCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaionCompteComponent]
    });
    fixture = TestBed.createComponent(ConsultaionCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
