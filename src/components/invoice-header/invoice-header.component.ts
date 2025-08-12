import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Company, Customer } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadComponent],
  template: `
    <div class="invoice-header">
      <div class="header-row">
        <div class="company-section">
          <div class="logo-section">
            <img 
              *ngIf="company.logo" 
              [src]="company.logo" 
              alt="Company Logo" 
              class="company-logo"
            >
            <app-file-upload
              *ngIf="!company.logo && editMode"
              accept="image/*"
              uploadText="Upload Logo"
              (fileSelect)="onLogoSelect($event)">
            </app-file-upload>
          </div>
          <div class="company-details">
            <input 
              *ngIf="editMode" 
              [(ngModel)]="company.name"
              (ngModelChange)="onCompanyChange()"
              class="company-name-input"
              placeholder="Company Name"
            >
            <h1 *ngIf="!editMode" class="company-name">{{ company.name }}</h1>
            
            <textarea 
              *ngIf="editMode"
              [(ngModel)]="company.address"
              (ngModelChange)="onCompanyChange()"
              class="company-address-input"
              placeholder="Company Address"
              rows="2">
            </textarea>
            <p *ngIf="!editMode" class="company-address">{{ company.address }}</p>
            
            <div class="company-contact">
              <input 
                *ngIf="editMode"
                [(ngModel)]="company.phone"
                (ngModelChange)="onCompanyChange()"
                class="contact-input"
                placeholder="Phone"
              >
              <input 
                *ngIf="editMode"
                [(ngModel)]="company.email"
                (ngModelChange)="onCompanyChange()"
                class="contact-input"
                placeholder="Email"
              >
              <div *ngIf="!editMode" class="contact-info">
                <span>{{ company.phone }}</span>
                <span>{{ company.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-info">
          <h2 class="invoice-title">INVOICE</h2>
          <div class="invoice-details">
            <div class="detail-row">
              <label>Invoice #:</label>
              <input 
                [(ngModel)]="invoiceNumber"
                (ngModelChange)="onInvoiceInfoChange()"
                class="invoice-input"
                readonly
              >
            </div>
            <div class="detail-row">
              <label>Date:</label>
              <input 
                type="date"
                [(ngModel)]="invoiceDate"
                (ngModelChange)="onInvoiceInfoChange()"
                class="invoice-input"
              >
            </div>
            <div class="detail-row">
              <label>Due Date:</label>
              <input 
                type="date"
                [(ngModel)]="dueDate"
                (ngModelChange)="onInvoiceInfoChange()"
                class="invoice-input"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="customer-section">
        <h3>Bill To:</h3>
        <div class="customer-details">
          <input 
            *ngIf="editMode"
            [(ngModel)]="customer.name"
            (ngModelChange)="onCustomerChange()"
            class="customer-input customer-name"
            placeholder="Customer Name"
          >
          <h4 *ngIf="!editMode" class="customer-name">{{ customer.name }}</h4>
          
          <textarea 
            *ngIf="editMode"
            [(ngModel)]="customer.address"
            (ngModelChange)="onCustomerChange()"
            class="customer-input"
            placeholder="Customer Address"
            rows="2">
          </textarea>
          <p *ngIf="!editMode">{{ customer.address }}</p>
          
          <div class="customer-contact">
            <input 
              *ngIf="editMode"
              [(ngModel)]="customer.phone"
              (ngModelChange)="onCustomerChange()"
              class="customer-input"
              placeholder="Phone"
            >
            <input 
              *ngIf="editMode"
              [(ngModel)]="customer.email"
              (ngModelChange)="onCustomerChange()"
              class="customer-input"
              placeholder="Email"
            >
            <div *ngIf="!editMode" class="contact-info">
              <span>{{ customer.phone }}</span>
              <span>{{ customer.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .invoice-header {
      padding: 20px 0;
      border-bottom: 2px solid #E5E7EB;
      margin-bottom: 20px;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
    }

    .company-section {
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .logo-section {
      width: 100px;
      height: 100px;
    }

    .company-logo {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
    }

    .company-details {
      flex: 1;
    }

    .company-name, .company-name-input {
      font-size: 28px;
      font-weight: bold;
      color: #1F2937;
      margin: 0 0 10px 0;
    }

    .company-name-input {
      border: none;
      border-bottom: 2px solid #3B82F6;
      background: transparent;
      padding: 5px 0;
    }

    .company-address, .company-address-input {
      color: #6B7280;
      line-height: 1.5;
      margin: 0 0 10px 0;
    }

    .company-address-input {
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 8px;
      resize: vertical;
      width: 100%;
    }

    .company-contact {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .contact-input {
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 6px;
      font-size: 14px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 14px;
      color: #6B7280;
    }

    .invoice-info {
      text-align: right;
    }

    .invoice-title {
      font-size: 36px;
      font-weight: bold;
      color: #3B82F6;
      margin: 0 0 20px 0;
    }

    .invoice-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    .detail-row label {
      font-weight: 600;
      color: #4B5563;
      min-width: 80px;
    }

    .invoice-input {
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 6px 10px;
      text-align: right;
      min-width: 150px;
    }

    .customer-section {
      background: #F8FAFC;
      padding: 20px;
      border-radius: 8px;
    }

    .customer-section h3 {
      margin: 0 0 15px 0;
      color: #3B82F6;
      font-size: 18px;
      font-weight: 600;
    }

    .customer-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .customer-name {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
    }

    .customer-input {
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 8px;
    }

    .customer-input.customer-name {
      font-size: 18px;
      font-weight: 600;
    }

    .customer-contact {
      display: flex;
      gap: 15px;
    }

    .customer-contact .customer-input {
      flex: 1;
    }

    @media (max-width: 768px) {
      .header-row {
        flex-direction: column;
        gap: 20px;
      }

      .company-section {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .logo-section {
        width: 80px;
        height: 80px;
      }

      .company-logo {
        width: 80px;
        height: 80px;
      }

      .company-name, .company-name-input {
        font-size: 24px;
        text-align: center;
      }

      .invoice-info {
        text-align: left;
      }

      .invoice-title {
        font-size: 28px;
      }

      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }

      .invoice-input {
        min-width: 100%;
        text-align: left;
      }

      .customer-contact {
        flex-direction: column;
      }

      .customer-section {
        padding: 15px;
      }

      .company-contact .contact-input {
        margin-bottom: 8px;
      }
    }

    @media (max-width: 480px) {
      .invoice-header {
        padding: 15px 0;
      }

      .header-row {
        gap: 15px;
      }

      .logo-section {
        width: 60px;
        height: 60px;
      }

      .company-logo {
        width: 60px;
        height: 60px;
      }

      .company-name, .company-name-input {
        font-size: 20px;
      }

      .invoice-title {
        font-size: 24px;
      }

      .customer-section {
        padding: 12px;
      }
    }

    @media print {
      .invoice-header {
        break-inside: avoid;
      }
    }
  `]
})
export class InvoiceHeaderComponent {
  @Input() company!: Company;
  @Input() customer!: Customer;
  @Input() invoiceNumber!: string;
  @Input() invoiceDate!: string;
  @Input() dueDate!: string;
  @Input() editMode: boolean = true;

  @Output() companyChange = new EventEmitter<Company>();
  @Output() customerChange = new EventEmitter<Customer>();
  @Output() invoiceInfoChange = new EventEmitter<{invoiceNumber: string, date: string, dueDate: string}>();

  onLogoSelect(logoData: string): void {
    this.company.logo = logoData;
    this.onCompanyChange();
  }

  onCompanyChange(): void {
    this.companyChange.emit(this.company);
  }

  onCustomerChange(): void {
    this.customerChange.emit(this.customer);
  }

  onInvoiceInfoChange(): void {
    this.invoiceInfoChange.emit({
      invoiceNumber: this.invoiceNumber,
      date: this.invoiceDate,
      dueDate: this.dueDate
    });
  }
}