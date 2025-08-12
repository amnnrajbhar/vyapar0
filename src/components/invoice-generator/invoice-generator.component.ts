import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceHeaderComponent } from '../invoice-header/invoice-header.component';
import { InvoiceItemsComponent } from '../invoice-items/invoice-items.component';
import { InvoiceFooterComponent } from '../invoice-footer/invoice-footer.component';
import { Invoice, Company, Customer, InvoiceItem } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-generator',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceHeaderComponent,
    InvoiceItemsComponent,
    InvoiceFooterComponent
  ],
  template: `
    <div class="invoice-generator">
      <div class="invoice-controls" [class.print-hidden]="true">
        <div class="controls-header">
          <h1>Invoice Generator</h1>
          <div class="control-buttons">
            <button 
              (click)="toggleEditMode()" 
              class="control-btn edit-btn"
              [class.active]="editMode">
              {{ editMode ? 'Preview' : 'Edit' }}
            </button>
            <button 
              (click)="printInvoice()" 
              class="control-btn print-btn">
              🖨️ Print Invoice
            </button>
            <button 
              (click)="newInvoice()" 
              class="control-btn new-btn">
              📄 New Invoice
            </button>
          </div>
        </div>
      </div>

      <div class="invoice-container" id="invoice-content">
        <app-invoice-header
          [company]="invoice.company"
          [customer]="invoice.customer"
          [invoiceNumber]="invoice.invoiceNumber"
          [invoiceDate]="invoice.date"
          [dueDate]="invoice.dueDate"
          [editMode]="editMode"
          (companyChange)="onCompanyChange($event)"
          (customerChange)="onCustomerChange($event)"
          (invoiceInfoChange)="onInvoiceInfoChange($event)">
        </app-invoice-header>

        <app-invoice-items
          [items]="invoice.items"
          [editMode]="editMode"
          (itemsChange)="onItemsChange($event)">
        </app-invoice-items>

        <app-invoice-footer
          [subtotal]="invoice.subtotal"
          [taxRate]="invoice.taxRate"
          [taxAmount]="invoice.taxAmount"
          [total]="invoice.total"
          [notes]="invoice.notes || ''"
          [signature]="invoice.signature || ''"
          [editMode]="editMode"
          (taxRateChange)="onTaxRateChange($event)"
          (notesChange)="onNotesChange($event)"
          (signatureChange)="onSignatureChange($event)">
        </app-invoice-footer>
      </div>
    </div>
  `,
  styles: [`
    .invoice-generator {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #F9FAFB;
      min-height: 100vh;
    }

    .invoice-controls {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .controls-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .controls-header h1 {
      margin: 0;
      color: #1F2937;
      font-size: 24px;
      font-weight: 700;
    }

    .control-buttons {
      display: flex;
      gap: 12px;
    }

    .control-btn {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .edit-btn {
      background: #3B82F6;
      color: white;
    }

    .edit-btn:hover {
      background: #2563EB;
    }

    .edit-btn.active {
      background: #10B981;
    }

    .print-btn {
      background: #6B7280;
      color: white;
    }

    .print-btn:hover {
      background: #4B5563;
    }

    .new-btn {
      background: #EF4444;
      color: white;
    }

    .new-btn:hover {
      background: #DC2626;
    }

    .invoice-container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .invoice-container:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
      .invoice-generator {
        padding: 10px;
      }

      .controls-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .controls-header h1 {
        font-size: 20px;
      }

      .control-buttons {
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
      }

      .control-btn {
        flex: 1;
        min-width: 120px;
        padding: 12px 16px;
        font-size: 14px;
      }

      .invoice-container {
        padding: 20px;
      }
    }

    @media (max-width: 480px) {
      .invoice-generator {
        padding: 5px;
      }

      .invoice-controls {
        padding: 15px;
        margin-bottom: 15px;
      }

      .controls-header h1 {
        font-size: 18px;
      }

      .control-buttons {
        gap: 8px;
      }

      .control-btn {
        padding: 10px 12px;
        font-size: 13px;
        min-width: 100px;
      }

      .invoice-container {
        padding: 15px;
        border-radius: 8px;
      }
    }

    @media (max-width: 360px) {
      .control-buttons {
        flex-direction: column;
      }

      .control-btn {
        width: 100%;
        min-width: auto;
      }
    }

    @media print {
      .invoice-generator {
        background: white;
        padding: 0;
      }

      .print-hidden {
        display: none !important;
      }

      .invoice-container {
        box-shadow: none;
        border-radius: 0;
        padding: 20px;
      }
    }
  `]
})
export class InvoiceGeneratorComponent implements OnInit {
  editMode: boolean = true;
  invoice: Invoice;

  constructor(private invoiceService: InvoiceService) {
    this.invoice = this.initializeInvoice();
  }

  ngOnInit(): void {
    this.updateTotals();
  }

  private initializeInvoice(): Invoice {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 30);

    return {
      id: Date.now().toString(),
      invoiceNumber: this.invoiceService.generateInvoiceNumber(),
      date: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      company: {
        name: '',
        address: '',
        phone: '',
        email: 'info@aman.com'
      },
      customer: {
        name: '',
        address: '',
        phone: '',
        email: ''
      },
      items: [],
      subtotal: 0,
      taxRate: 18,
      taxAmount: 0,
      total: 0,
      notes: 'Thank you for your business!'
    };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  printInvoice(): void {
    this.invoiceService.printInvoice();
  }

  newInvoice(): void {
    this.invoice = this.initializeInvoice();
    this.editMode = true;
    this.updateTotals();
  }

  onCompanyChange(company: Company): void {
    this.invoice.company = { ...company };
  }

  onCustomerChange(customer: Customer): void {
    this.invoice.customer = { ...customer };
  }

  onInvoiceInfoChange(info: {invoiceNumber: string, date: string, dueDate: string}): void {
    this.invoice.invoiceNumber = info.invoiceNumber;
    this.invoice.date = info.date;
    this.invoice.dueDate = info.dueDate;
  }

  onItemsChange(items: InvoiceItem[]): void {
    this.invoice.items = [...items];
    this.updateTotals();
  }

  onTaxRateChange(taxRate: number): void {
    this.invoice.taxRate = taxRate;
    this.updateTotals();
  }

  onNotesChange(notes: string): void {
    this.invoice.notes = notes;
  }

  onSignatureChange(signature: string): void {
    this.invoice.signature = signature;
  }

  private updateTotals(): void {
    this.invoiceService.updateInvoiceTotals(this.invoice);
  }
}