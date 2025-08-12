export interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: Company;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  signature?: string;
  notes?: string;
}