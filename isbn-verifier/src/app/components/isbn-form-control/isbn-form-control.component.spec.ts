import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsbnFormControlComponent } from './isbn-form-control.component';
import {
  invalidISBNTenValues,
  invalidISBNThirteenValues,
  validISBNTenValues,
  validISBNThirteenValues,
} from 'src/app/constants';

describe('IsbnFormControlComponent', () => {
  let component: IsbnFormControlComponent;
  let fixture: ComponentFixture<IsbnFormControlComponent>;
  let isbnInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IsbnFormControlComponent, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(IsbnFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    isbnInput = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  // #region test basic input funtionality
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test input value gets updated', waitForAsync(async () => {
    isbnInput.value = validISBNTenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.value).toBe(validISBNTenValues[0])
      );
  }));
  it('should test valid input should have green done icon', waitForAsync(async () => {
    isbnInput.value = validISBNTenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(
          fixture.debugElement.query(By.css('color-green')).nativeElement
            .innerText
        ).toBe('done')
      );
  }));
  it('should test invalid input should have red close icon', waitForAsync(async () => {
    isbnInput.value = invalidISBNTenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(
          fixture.debugElement.query(By.css('color-red')).nativeElement
            .innerText
        ).toBe('done')
      );
  }));
  // #endregion

  // #region ISBN-10 valid cases
  it('should test valid ISBN-10 value with dashes and report valid', waitForAsync(async () => {
    isbnInput.value = validISBNTenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  }));
  it('should test valid ISBN-10 value with dashes and ending in X and report valid', () => {
    isbnInput.value = validISBNTenValues[1];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  });
  it('should test valid ISBN-10 value without dashes and report valid', waitForAsync(async () => {
    isbnInput.value = validISBNTenValues[2];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  }));
  // #endregion

  // #region ISBN-10 invalid cases
  it('should test invalid ISBN-10 value with invalid length', waitForAsync(async () => {
    isbnInput.value = invalidISBNTenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnLength')).toBe(true)
      );
  }));
  it('should test invalid ISBN-10 value with invalid format', waitForAsync(async () => {
    isbnInput.value = invalidISBNTenValues[1];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnFormat')).toBe(true)
      );
  }));
  it('should test invalid ISBN-10 value with invalid checksum', waitForAsync(async () => {
    isbnInput.value = invalidISBNTenValues[2];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnChecksum')).toBe(true)
      );
  }));
  // #endregion

  // #region ISBN-13 valid cases
  it('should test valid ISBN-13 value with dashes and report valid', waitForAsync(async () => {
    isbnInput.value = validISBNThirteenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  }));
  it('should test valid ISBN-13 value with dashes and ending in X and report valid', () => {
    isbnInput.value = validISBNThirteenValues[1];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  });
  it('should test valid ISBN-13 value without dashes and report valid', waitForAsync(async () => {
    isbnInput.value = validISBNThirteenValues[2];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => expect(component.isbnFormControl.valid).toBe(true));
  }));
  // #endregion

  // #region ISBN-13 invalid cases
  it('should test invalid ISBN-13 value with invalid length', waitForAsync(async () => {
    isbnInput.value = invalidISBNThirteenValues[0];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnLength')).toBe(true)
      );
  }));
  it('should test invalid ISBN-13 value with invalid format', waitForAsync(async () => {
    isbnInput.value = invalidISBNThirteenValues[1];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnFormat')).toBe(true)
      );
  }));
  it('should test invalid ISBN-13 value with invalid checksum', waitForAsync(async () => {
    isbnInput.value = invalidISBNThirteenValues[2];
    isbnInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() =>
        expect(component.isbnFormControl.hasError('isbnChecksum')).toBe(true)
      );
  }));
  // #endregion
});

// TODO: switch to jest
