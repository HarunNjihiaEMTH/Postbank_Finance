export interface PurchaseOrder {
  title?: string;
  contactPerson?: string;
  supplierId?: string;
  supplierAddress?: string;
  supplierMobile?: string;
  supplierName?: string;
  orderItems?: [
    {
      itemName?: string;
      itemQuantity?: number;
      itemUnitPrice?: number;
    }
  ];
}
