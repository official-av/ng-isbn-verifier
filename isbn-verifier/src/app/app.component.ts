import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsbnFormControlComponent } from './components/isbn-form-control/isbn-form-control.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IsbnFormControlComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'isbn-verifier';
}
