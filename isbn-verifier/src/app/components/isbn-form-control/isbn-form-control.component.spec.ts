import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnFormControlComponent } from './isbn-form-control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IsbnFormControlComponent', () => {
  let component: IsbnFormControlComponent;
  let fixture: ComponentFixture<IsbnFormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IsbnFormControlComponent, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(IsbnFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// TODO: add unit tests
// TODO: switch to jest
