// Types for the application
export interface Transaction {
  id?: string | number;
  amount?: number;
  date?: string | Date;
  status?: string;
  user?: User;
  reference?: string;
  [key: string]: any;
}

export interface Payment {
  id?: string | number;
  amount?: number;
  date?: string | Date;
  status?: string;
  method?: string;
  reference?: string;
  [key: string]: any;
}

export interface Order {
  id?: string | number;
  total?: number;
  status?: string;
  date?: string | Date;
  customer?: User;
  items?: any[];
  [key: string]: any;
}

export interface Product {
  id?: string | number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: any;
  [key: string]: any;
}

export interface User {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  [key: string]: any;
}

export interface Customer extends User {
  orders?: Order[];
  [key: string]: any;
}

export interface Delivery {
  id?: string | number;
  status?: string;
  date?: string | Date;
  address?: string;
  order?: Order;
  deliveryman?: User;
  [key: string]: any;
}

export interface Review {
  id?: string | number;
  rating?: number;
  comment?: string;
  date?: string | Date;
  user?: User;
  [key: string]: any;
}

export interface Bonus {
  id?: string | number;
  name?: string;
  value?: number;
  type?: string;
  [key: string]: any;
}

export interface Item {
  id?: string | number;
  name?: string;
  quantity?: number;
  price?: number;
  [key: string]: any;
} 