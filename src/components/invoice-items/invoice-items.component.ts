import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceItem } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="invoice-items">
      <div class="items-header">
        <h3>Items</h3>
        <button 
          *ngIf="editMode" 
          (click)="addItem()" 
          class="add-item-btn">
          + Add Item
        </button>
      </div>

      <div class="items-table">
        <div class="table-header">
          <div class="col-description">Description</div>
          <div class="col-quantity">Qty</div>
          <div class="col-rate">Rate</div>
          <div class="col-amount">Amount</div>
          <div class="col-actions" *ngIf="editMode">Actions</div>
        </div>

        <div class="table-body">
          <div 
            *ngFor="let item of items; trackBy: trackByFn" 
            class="table-row">
            
            <div class="col-description">
              <textarea 
                *ngIf="editMode"
                [(ngModel)]="item.description"
                (ngModelChange)="onItemChange(item)"
                class="item-input description-input"
                placeholder="Item description"
                rows="2">
              </textarea>
              <div *ngIf="!editMode" class="description-text">{{ item.description }}</div>
            </div>

            <div class="col-quantity">
              <input 
                *ngIf="editMode"
                type="number"
                [(ngModel)]="item.quantity"
                (ngModelChange)="onItemChange(item)"
                class="item-input quantity-input"
                min="0"
                step="1"
              >
              <span *ngIf="!editMode">{{ item.quantity }}</span>
            </div>

            <div class="col-rate">
              <input 
                *ngIf="editMode"
                type="number"
                [(ngModel)]="item.rate"
                (ngModelChange)="onItemChange(item)"
                class="item-input rate-input"
                min="0"
                step="0.01"
              >
              <span *ngIf="!editMode">₹{{ item.rate | number:'1.2-2' }}</span>
            </div>

            <div class="col-amount">
              <span class="amount">₹{{ item.amount | number:'1.2-2' }}</span>
            </div>

            <div class="col-actions" *ngIf="editMode">
              <button 
                (click)="removeItem(item.id)" 
                class="remove-btn"
                title="Remove item">
                🗑️
              </button>
            </div>
          </div>

          <div *ngIf="items.length === 0" class="empty-state">
            <p>No items added yet. Click "Add Item" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .invoice-items {
      margin: 20px 0;
    }

    .items-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .items-header h3 {
      margin: 0;
      color: #1F2937;
      font-size: 20px;
      font-weight: 600;
    }

    .add-item-btn {
      background: #3B82F6;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .add-item-btn:hover {
      background: #2563EB;
    }

    .items-table {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 1fr 80px 120px 120px 60px;
      background: #F9FAFB;
      padding: 12px;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #E5E7EB;
    }

    .table-header.no-actions {
      grid-template-columns: 1fr 80px 120px 120px;
    }

    .table-body {
      background: white;
    }

    .table-row {
      display: grid;
      grid-template-columns: 1fr 80px 120px 120px 60px;
      padding: 12px;
      border-bottom: 1px solid #F3F4F6;
      align-items: start;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .col-description {
      padding-right: 12px;
    }

    .col-quantity, .col-rate, .col-amount, .col-actions {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item-input {
      width: 100%;
      border: 1px solid #D1D5DB;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 14px;
    }

    .description-input {
      resize: vertical;
      min-height: 40px;
    }

    .description-text {
      line-height: 1.4;
      white-space: pre-wrap;
    }

    .quantity-input, .rate-input {
      text-align: center;
      max-width: 80px;
    }

    .amount {
      font-weight: 600;
      color: #059669;
    }

    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .remove-btn:hover {
      background: #FEF2F2;
    }

    .empty-state {
      padding: 40px 20px;
      text-align: center;
      color: #6B7280;
      font-style: italic;
    }

    .empty-state p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .table-header {
        display: none;
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 16px;
        border-bottom: 1px solid #F3F4F6;
      }

      .col-description, .col-quantity, .col-rate, .col-amount, .col-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #F8FAFC;
      }

      .col-description::before { 
        content: "Description: "; 
        font-weight: 600; 
        color: #374151;
        min-width: 100px;
      }
      .col-quantity::before { 
        content: "Quantity: "; 
        font-weight: 600; 
        color: #374151;
        min-width: 100px;
      }
      .col-rate::before { 
        content: "Rate: "; 
        font-weight: 600; 
        color: #374151;
        min-width: 100px;
      }
      .col-amount::before { 
        content: "Amount: "; 
        font-weight: 600; 
        color: #374151;
        min-width: 100px;
      }
      .col-actions::before { 
        content: "Actions: "; 
        font-weight: 600; 
        color: #374151;
        min-width: 100px;
      }

      .col-description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .col-description::before {
        margin-bottom: 8px;
      }

      .description-input {
        width: 100%;
      }

      .description-text {
        width: 100%;
        text-align: left;
      }

      .col-quantity, .col-rate, .col-amount {
        text-align: right;
      }

      .quantity-input, .rate-input {
        max-width: 100px;
      }

      .items-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .add-item-btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .items-table {
        border-radius: 6px;
      }

      .table-row {
        padding: 12px;
      }

      .col-description, .col-quantity, .col-rate, .col-amount, .col-actions {
        padding: 6px 0;
      }

      .col-description::before,
      .col-quantity::before,
      .col-rate::before,
      .col-amount::before,
      .col-actions::before {
        min-width: 80px;
        font-size: 14px;
      }

      .quantity-input, .rate-input {
        max-width: 80px;
      }
    }

    @media print {
      .col-actions {
        display: none !important;
      }
      
      .table-header {
        grid-template-columns: 1fr 80px 120px 120px !important;
      }
      
      .table-row {
        grid-template-columns: 1fr 80px 120px 120px !important;
      }
    }
  `]
})
export class InvoiceItemsComponent {
  @Input() items: InvoiceItem[] = [];
  @Input() editMode: boolean = true;
  @Output() itemsChange = new EventEmitter<InvoiceItem[]>();

  addItem(): void {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    this.items.push(newItem);
    this.itemsChange.emit(this.items);
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
    this.itemsChange.emit(this.items);
  }

  onItemChange(item: InvoiceItem): void {
    item.amount = item.quantity * item.rate;
    this.itemsChange.emit(this.items);
  }

  trackByFn(index: number, item: InvoiceItem): string {
    return item.id;
  }
}