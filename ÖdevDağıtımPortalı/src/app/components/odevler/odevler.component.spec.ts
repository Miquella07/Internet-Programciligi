/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OdevlerComponent } from './odevler.component';

describe('OdevlerComponent', () => {
  let component: OdevlerComponent;
  let fixture: ComponentFixture<OdevlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdevlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdevlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
