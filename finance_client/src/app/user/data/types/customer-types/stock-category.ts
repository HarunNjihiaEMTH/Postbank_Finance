export interface StockCategory {
  categoryDescription?: string;
  categoryName?: string;
  deletedBy?: string;
  deletedFlag?: string;
  deletedTime?: Date;
  id?: 0;
  modifiedBy?: string;
  modifiedFlag?: string;
  modifiedTime?: Date;
  postedFlag?: string;
  postedTime?: Date;
  postedBy?: string;
  products?: [
    {
      categoryName?: string;
      category_id?: string;
      deletedBy?: string;
      deletedFlag?: string;
      deletedTime?: Date;
      description?: string;
      id?: 0;
      modifiedBy?: string;
      modifiedFlag?: string;
      modifiedTime?: Date;
      name?: string;
      postedFlag?: string;
      postedTime?: Date;
      price?: 0;
      reason?: string;
      status?: string;
      stock?: 0;
      verifiedBy?: string;
      verifiedFlag?: string;
      verifiedTime?: Date;
    }
  ];
  reason?: string;
  status?: string;
  verifiedBy?: string;
  verifiedFlag?: string;
  verifiedTime?: Date;
}
