import { Injectable } from '@angular/core';
import { Invoice, InvoiceItem } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  calculateItemAmount(quantity: number, rate: number): number {
    return quantity * rate;
  }

  calculateSubtotal(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }

  calculateTaxAmount(subtotal: number, taxRate: number): number {
    return (subtotal * taxRate) / 100;
  }

  calculateTotal(subtotal: number, taxAmount: number): number {
    return subtotal + taxAmount;
  }

  generateInvoiceNumber(): string {
    const timestamp = Date.now();
    return `INV-${timestamp.toString().slice(-6)}`;
  }

  updateInvoiceTotals(invoice: Invoice): void {
    // Recalculate all item amounts
    invoice.items.forEach(item => {
      item.amount = this.calculateItemAmount(item.quantity, item.rate);
    });

    // Recalculate totals
    invoice.subtotal = this.calculateSubtotal(invoice.items);
    invoice.taxAmount = this.calculateTaxAmount(invoice.subtotal, invoice.taxRate);
    invoice.total = this.calculateTotal(invoice.subtotal, invoice.taxAmount);
  }

  printInvoice(): void {
    window.print();
  }
}