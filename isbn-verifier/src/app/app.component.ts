import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsbnFormControlComponent } from './components/isbn-form-control/isbn-form-control.component';
import {
  invalidISBNTenValues,
  invalidISBNThirteenValues,
  validISBNTenValues,
  validISBNThirteenValues,
} from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IsbnFormControlComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly title = 'isbn-verifier';
  readonly validISBNTens = validISBNTenValues;
  readonly invalidISBNTens = invalidISBNTenValues;
  readonly validISBNThirteenValues = validISBNThirteenValues;
  readonly invalidISBNThirteenValues = invalidISBNThirteenValues;
}
