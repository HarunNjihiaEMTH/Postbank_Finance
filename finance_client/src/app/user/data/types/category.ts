export interface Category {
  categoryDescription?: string;
  categoryName?: string;
  deletedBy?: string;
  deletedFlag?: string;
  deletedTime?:Date;
  glCode?: string;
  id?: number;
  modifiedBy?: string;
  modifiedFlag?: string;
  modifiedTime?: Date
  postedFlag?: string;
  postedTime?: Date;
  postedBy?: string,
  reason?: string;
  status?: string;
  subCategories?: [
    {
      category_id?: number;
      deletedBy?: string;
      deletedFlag?: string;
      deletedTime?:Date
      id?: number;
      modifiedBy?: string;
      modifiedFlag?: string;
      modifiedTime?: Date;
      postedFlag?: string;
      postedTime?: Date
      reason?: string;
      status?: string;
      subcategoryDescription?: string;
      subcategoryName?: string;
      verifiedBy?: string;
      verifiedFlag?: string;
      verifiedTime?: Date
    }
  ];
  verifiedBy?: string;
  verifiedFlag?: string;
  verifiedTime?: Date
}
