import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import isbnValidator from 'src/app/isbn.validator';

@Component({
  selector: 'app-isbn-form-control',
  standalone: true,
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
export class IsbnFormControlComponent {
  isbnFormControl = new FormControl<string>('', [
    Validators.required,
    isbnValidator,
  ]);
  // TODO: optimise when to call validator
}
