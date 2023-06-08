export interface OrderItem {
  id?: number;
  itemName?: string;
  itemQuantity?: number;
  itemTotalValue?: number;
  itemUnitPrice?: number;
  serviceName?: number;
  servicePrice?: number;
  orderItemType?: string;
  tax?: number;
  expenseId?: string;
  vatAmount?: number;
  incomeWithholdingamount?: number;
  vatWitholding?: number;
  amountTobepaid?: number;
  amountBalance?: number;
  remarks?: string;
  witholdingRate?: number;
  incomeTax?: number;
  deliveryStatus?: string;
  invoiceNo?: string;
  purchaseOrder_id?: string;
  vatRate?: string
}