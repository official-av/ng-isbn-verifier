import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnFormControlComponent } from './isbn-form-control.component';

describe('IsbnFormControlComponent', () => {
  let component: IsbnFormControlComponent;
  let fixture: ComponentFixture<IsbnFormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IsbnFormControlComponent]
    });
    fixture = TestBed.createComponent(IsbnFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
