export interface ILink {
  title: string;
  href: string;
  icon: React.ReactNode;
}
export interface ICustomers {
  _id: string;
  phone_primary: string;
  fname: string;
  address: string;
  budget: number;
  lname: number;
}
export interface Product {
  adminId: string;
  category: string;
  comment: string;
  createdAt: string; // ISO8601 formatdagi sana
  isActive: boolean;
  price: number; // Narx
  quantity: number; // Miqdor
  sellerId: string;
  title: string; // Mahsulot nomi
  units: string; // O‘lchov birligi (masalan, "dona")
  updatedAt: string; // ISO8601 formatdagi sana
  __v: number; // Versiya
  _id: string; // Unique ID
}
