export interface Organisation {
  address?: string;
  city?: string;
  country?: string;
  deletedBy?: string;
  deletedFlag?:string;
  deletedTime?: Date;
  email?: string;
  id?: number;
  modifiedBy?: string;
  modifiedFlag?: string;
  modifiedTime?: Date;
  organisationName?: string;
  phone?: string;
  postedFlag?: string;
  postedTime?: Date;
  reason?: string;
  status?: string;
  verifiedBy?: string;
  verifiedFlag?: string;
  verifiedTime?: Date;
}
