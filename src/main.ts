import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { InvoiceGeneratorComponent } from './components/invoice-generator/invoice-generator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceGeneratorComponent,CommonModule],
  template: `
    <app-invoice-generator></app-invoice-generator>
  `
})
export class App {}

bootstrapApplication(App);