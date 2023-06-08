export interface Expense {
  deletedBy?: string;
  deletedFlag?: string;
  deletedTime?: Date;
  expenseAccount?: string;
  accountCurrencyCode?: string;
  expenseCode?: string;
  expenseDescription?: string;
  expenseMajorCategory?: string;
  expenseSubCategory?: string;
  isPointing?: boolean;
  expense_type: string;
  id?: number;
  modifiedBy?: string;
  modifiedFlag?: string;
  modifiedTime?: Date;
  postedBy?: string;
  postedFlag?: string;
  reason?: string;
  postedTime?: Date;
  status?: string;
  verifiedBy?: string;
  verifiedFlag?: string;
  verifiedTime?: Date;
}
