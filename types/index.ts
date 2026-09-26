export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: 'hoodies' | 't-shirts' | 'bottoms' | 'accessories';
  categoryLabel: string;
  collection: string[];
  gender: 'men' | 'women' | 'unisex';
  badge?: 'New' | 'Bestseller' | 'Sale' | 'Limited';
  images: string[];
  description: string;
  features: string[];
  fabric: string;
  fit: string;
  care: string[];
  sizes: string[];
  colors: { name: string; hex: string; inStock: boolean }[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  tags: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  createdAt?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode?: string;
    landmark?: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'esewa' | 'khalti' | 'bank_transfer' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentDetails?: {
    transactionId?: string;
    bankName?: string;
    receiptImage?: string;
    walletPhone?: string;
  };
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  couponCode?: string;
}

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: {
    id: string;
    title: string;
    street: string;
    city: string;
    province: string;
    landmark?: string;
    isDefault: boolean;
  }[];
  joinedDate: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g., 10 for 10% or 500 for Rs. 500 off
  minOrder: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
}
