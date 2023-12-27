import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs';
import isbnValidator from 'src/app/isbn.validator';

@Component({
  selector: 'app-isbn-form-control',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './isbn-form-control.component.html',
  styleUrls: ['./isbn-form-control.component.css'],
})
export class IsbnFormControlComponent implements OnDestroy {
  formControlSubscription: Subscription;
  isbnFormControl = new FormControl<string>('', [Validators.required]);

  constructor(private _cdRef: ChangeDetectorRef) {
    // optimisation for when to call validator instead of providing in validators array and calling for every keystroke
    // can also be alternatively defined in validators array and updateOn can be set to onBlur, UX Preference
    this.formControlSubscription = this.isbnFormControl.valueChanges
      .pipe(
        filter((v) => v !== ''),
        debounceTime(500),
        distinctUntilChanged(),
        tap((value) =>
          this.isbnFormControl.setErrors(
            isbnValidator({ value } as AbstractControl)
          )
        ),
        // only run change detection when needed
        tap(() => this._cdRef.detectChanges())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }
}
