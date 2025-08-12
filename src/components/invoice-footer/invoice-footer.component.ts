import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-invoice-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadComponent],
  template: `
    <div class="invoice-footer">
      <div class="footer-content">
        <div class="notes-section">
          <h4>Notes:</h4>
          <textarea 
            *ngIf="editMode"
            [(ngModel)]="notes"
            (ngModelChange)="onNotesChange()"
            class="notes-input"
            placeholder="Add any notes or additional information..."
            rows="4">
          </textarea>
          <p *ngIf="!editMode && notes" class="notes-text">{{ notes }}</p>
          <p *ngIf="!editMode && !notes" class="notes-text">No additional notes</p>
        </div>

        <div class="totals-section">
          <div class="totals-table">
            <div class="total-row">
              <span class="total-label">Subtotal:</span>
              <span class="total-value">₹{{ subtotal | number:'1.2-2' }}</span>
            </div>

            <div class="total-row tax-row">
              <span class="total-label">
                Tax (
                <input 
                  *ngIf="editMode"
                  type="number"
                  [(ngModel)]="taxRate"
                  (ngModelChange)="onTaxRateChange()"
                  class="tax-rate-input"
                  min="0"
                  max="100"
                  step="0.1"
                >
                <span *ngIf="!editMode">{{ taxRate }}</span>
                %):
              </span>
              <span class="total-value">₹{{ taxAmount | number:'1.2-2' }}</span>
            </div>

            <div class="total-row final-total">
              <span class="total-label">Total:</span>
              <span class="total-value">₹{{ total | number:'1.2-2' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="signature-section">
        <div class="signature-container">
          <h4>Signature:</h4>
          <div class="signature-area">
            <img 
              *ngIf="signature" 
              [src]="signature" 
              alt="Signature" 
              class="signature-image"
            >
            <app-file-upload
              *ngIf="!signature && editMode"
              accept="image/*"
              uploadText="Upload Signature"
              (fileSelect)="onSignatureSelect($event)">
            </app-file-upload>
            <div *ngIf="!signature && !editMode" class="signature-placeholder">
              No signature provided
            </div>
          </div>
        </div>

        <div class="payment-terms">
          <p><strong>Payment Terms:</strong></p>
          <p>Payment is due within 30 days of invoice date.</p>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .invoice-footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #E5E7EB;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 30px;
      margin-bottom: 30px;
    }

    .notes-section h4 {
      margin: 0 0 12px 0;
      color: #374151;
      font-size: 16px;
      font-weight: 600;
    }

    .notes-input {
      width: 100%;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      padding: 10px;
      resize: vertical;
      font-family: inherit;
      font-size: 14px;
    }

    .notes-text {
      color: #6B7280;
      line-height: 1.5;
      margin: 0;
    }

    .totals-section {
      display: flex;
      justify-content: flex-end;
    }

    .totals-table {
      min-width: 300px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #F3F4F6;
    }

    .total-row:last-child {
      border-bottom: none;
    }

    .tax-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .total-label {
      font-weight: 500;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .total-value {
      font-weight: 600;
      color: #059669;
    }

    .tax-rate-input {
      width: 50px;
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 2px 4px;
      text-align: center;
      font-size: 14px;
    }

    .final-total {
      border-top: 2px solid #3B82F6;
      padding-top: 12px;
      margin-top: 8px;
    }

    .final-total .total-label {
      font-size: 18px;
      font-weight: 700;
      color: #1F2937;
    }

    .final-total .total-value {
      font-size: 20px;
      font-weight: 700;
      color: #059669;
    }

    .signature-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 40px;
    }

    .signature-container h4 {
      margin: 0 0 12px 0;
      color: #374151;
      font-size: 16px;
      font-weight: 600;
    }

    .signature-area {
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .signature-image {
      max-width: 200px;
      max-height: 100px;
      object-fit: contain;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
      padding: 8px;
    }

    .signature-placeholder {
      color: #9CA3AF;
      font-style: italic;
      text-align: center;
      padding: 20px;
      border: 1px dashed #D1D5DB;
      border-radius: 4px;
      width: 200px;
    }

    .payment-terms {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .payment-terms p {
      margin: 0;
      color: #6B7280;
      font-size: 14px;
      line-height: 1.4;
    }

    .payment-terms p:first-child {
      color: #374151;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .totals-section {
        justify-content: flex-start;
      }

      .signature-section {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .totals-table {
        min-width: auto;
        width: 100%;
      }

      .total-row {
        padding: 10px 0;
      }

      .total-label, .total-value {
        font-size: 16px;
      }

      .final-total .total-label {
        font-size: 18px;
      }

      .final-total .total-value {
        font-size: 20px;
      }

      .signature-area {
        min-height: 100px;
      }

      .signature-image {
        max-width: 150px;
        max-height: 80px;
      }

      .signature-placeholder {
        width: 150px;
        padding: 15px;
      }
    }

    @media (max-width: 480px) {
      .invoice-footer {
        margin-top: 20px;
        padding-top: 15px;
      }

      .footer-content {
        gap: 15px;
      }

      .notes-input {
        padding: 8px;
        font-size: 14px;
      }

      .total-row {
        padding: 8px 0;
      }

      .total-label, .total-value {
        font-size: 14px;
      }

      .final-total .total-label {
        font-size: 16px;
      }

      .final-total .total-value {
        font-size: 18px;
      }

      .tax-rate-input {
        width: 40px;
        font-size: 12px;
      }

      .signature-section {
        margin-top: 20px;
        gap: 15px;
      }

      .signature-area {
        min-height: 80px;
      }

      .signature-image {
        max-width: 120px;
        max-height: 60px;
      }

      .signature-placeholder {
        width: 120px;
        padding: 10px;
        font-size: 12px;
      }

      .payment-terms p {
        font-size: 12px;
      }
    }

    @media print {
      .invoice-footer {
        page-break-inside: avoid;
      }
    }
  `]
})
export class InvoiceFooterComponent {
  @Input() subtotal: number = 0;
  @Input() taxRate: number = 18;
  @Input() taxAmount: number = 0;
  @Input() total: number = 0;
  @Input() notes: string = '';
  @Input() signature: string = '';
  @Input() editMode: boolean = true;

  @Output() taxRateChange = new EventEmitter<number>();
  @Output() notesChange = new EventEmitter<string>();
  @Output() signatureChange = new EventEmitter<string>();

  onTaxRateChange(): void {
    this.taxRateChange.emit(this.taxRate);
  }

  onNotesChange(): void {
    this.notesChange.emit(this.notes);
  }

  onSignatureSelect(signatureData: string): void {
    this.signature = signatureData;
    this.signatureChange.emit(signatureData);
  }
}