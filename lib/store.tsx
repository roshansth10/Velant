'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem, Order, CustomerUser, Coupon, Review } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_ORDERS, INITIAL_COUPONS, INITIAL_REVIEWS } from '@/data/admin';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (id: string) => void;
  deleteCoupon: (id: string) => void;
  discountAmount: number;
  finalTotal: number;

  // Wishlist
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & Customer
  user: CustomerUser | null;
  login: (email: string, pass: string) => { success: boolean; message?: string };
  register: (name: string, email: string, pass: string, phone?: string) => { success: boolean; message?: string };
  logout: () => void;
  updateUserProfile: (profile: Partial<CustomerUser>) => void;
  addAddress: (address: CustomerUser['addresses'][0]) => void;
  deleteAddress: (id: string) => void;

  // Admin Auth
  isAdmin: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: Review['status']) => void;

  // UI Modals & Assets
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAssetModalOpen: boolean;
  setIsAssetModalOpen: (open: boolean) => void;
  downloadImage: (url: string, filename?: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DEMO_USER: CustomerUser = {
  id: 'usr-101',
  name: 'Aayush Rayamajhi',
  email: 'aayush.r@velant.com',
  phone: '+977 9841998877',
  joinedDate: 'January 2025',
  addresses: [
    {
      id: 'addr-1',
      title: 'Home / Studio',
      street: 'Ward 4, Baluwatar',
      city: 'Kathmandu',
      province: 'Bagmati Province',
      landmark: 'Near Russian Embassy',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Workshop',
      street: 'Sanepa Heights, Ward 2',
      city: 'Lalitpur',
      province: 'Bagmati Province',
      landmark: 'Behind British School',
      isDefault: false,
    },
  ],
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage after mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem('velant_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('velant_wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedUser = localStorage.getItem('velant_user');
        if (savedUser) setUser(JSON.parse(savedUser));

        const savedAdmin = localStorage.getItem('velant_admin');
        if (savedAdmin) setIsAdmin(JSON.parse(savedAdmin));

        const savedOrders = localStorage.getItem('velant_orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));

        const savedProducts = localStorage.getItem('velant_products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));
      } catch {
        // ignore storage parsing error
      }
      setIsInitialized(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('velant_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('velant_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('velant_orders', JSON.stringify(orders));
    } catch {}
  }, [orders, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('velant_products', JSON.stringify(products));
    } catch {}
  }, [products, isInitialized]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity,
        },
      ];
    });
    showToast(`Added "${product.name}" (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of Rs. ${found.minOrder.toLocaleString()} required for this code.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied!`, 'success');
    return { success: true, message: `Promo code applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created.`);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon deleted', 'info');
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Product';

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed ${prodName} from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${prodName} to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Customer Auth
  const login = (email: string, pass: string) => {
    if (!email || !pass) {
      return { success: false, message: 'Please enter both email and password.' };
    }
    if (pass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }
    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '+977 9800000000',
      joinedDate: 'Today',
      addresses: DEMO_USER.addresses,
    };
    setUser(newUser);
    localStorage.setItem('velant_user', JSON.stringify(newUser));
    showToast(`Welcome back, ${newUser.name}!`);
    return { success: true };
  };

  const register = (name: string, email: string, pass: string) => {
    if (!name || !email || !pass) {
      return { success: false, message: 'Please fill in all registration fields.' };
    }
    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: '+977 9800000000',
      joinedDate: 'September 2026',
      addresses: [],
    };
    setUser(newUser);
    localStorage.setItem('velant_user', JSON.stringify(newUser));
    showToast(`Account created. Welcome to VELANT, ${name}!`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velant_user');
    showToast('Logged out successfully', 'info');
  };

  const updateUserProfile = (profile: Partial<CustomerUser>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem('velant_user', JSON.stringify(updated));
    showToast('Profile details updated');
  };

  const addAddress = (address: CustomerUser['addresses'][0]) => {
    if (!user) return;
    const newAddresses = address.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(address)
      : [...user.addresses, address];
    updateUserProfile({ addresses: newAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const filtered = user.addresses.filter((a) => a.id !== id);
    updateUserProfile({ addresses: filtered });
    showToast('Address deleted', 'info');
  };

  // Admin Auth
  const adminLogin = (username: string, pass: string) => {
    if (
      (username === 'admin@velant.com' || username === 'admin') &&
      (pass === 'admin123' || pass === 'velant')
    ) {
      setIsAdmin(true);
      localStorage.setItem('velant_admin', 'true');
      showToast('Authenticated as Admin');
      return true;
    }
    // Allow demo one-click entry
    if (username && pass) {
      setIsAdmin(true);
      localStorage.setItem('velant_admin', 'true');
      showToast('Authenticated as Admin (Demo)');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('velant_admin');
    showToast('Admin logged out', 'info');
  };

  // Products CRUD
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" published.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${num}`,
      orderNumber: `VL-${num}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast(`Order status updated to ${status}`);
  };

  // Reviews
  const addReview = (revData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      status: 'approved',
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review submitted! Thank you for your feedback.');
  };

  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Review ${status}`);
  };

  // Image Downloader ("all the images should be downloadable")
  const downloadImage = async (url: string, filename = 'velant-asset.jpg') => {
    showToast(`Downloading ${filename}...`, 'info');
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      showToast(`Asset saved: ${filename}`, 'success');
    } catch {
      // Fallback: Open in new window or trigger standard download
      const fallbackLink = document.createElement('a');
      fallbackLink.href = url;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noreferrer';
      fallbackLink.download = filename;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
      showToast(`Opened high-res asset for saving`, 'info');
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        discountAmount,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        register,
        logout,
        updateUserProfile,
        addAddress,
        deleteAddress,
        isAdmin,
        adminLogin,
        adminLogout,
        orders,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        updateReviewStatus,
        isSearchOpen,
        setIsSearchOpen,
        isAssetModalOpen,
        setIsAssetModalOpen,
        downloadImage,
        toasts,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notifications Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-xs uppercase tracking-wider font-mono border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-800'
                : toast.type === 'info'
                ? 'bg-neutral-900/90 text-neutral-300 border-neutral-700'
                : 'bg-black/90 text-white border-neutral-800'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
