export interface CostCenter {
  costCenterCode?: string;
  costCenterDescription?: string;
  costCenterName?: string;
  deletedBy?: string;
  deletedFlag?: string;
  deletedTime?: Date;
  expenses?: [
    {
      expense?: string;
      expenseAccount?: string;
      expenseId?: string;
      id?: number;
    }
  ];
  id?: number;
  incomeWithholdingAccount?: string;
  modifiedBy?: string;
  modifiedFlag?: string;
  modifiedTime?: Date;
  postedBy?: string;
  postedFlag?: string;
  postedTime?: Date;
  reason?: string;
  status?: string;
  vatAccount?: string;
  verifiedBy?: string;
  verifiedFlag?: string;
  verifiedTime?: Date;
}
