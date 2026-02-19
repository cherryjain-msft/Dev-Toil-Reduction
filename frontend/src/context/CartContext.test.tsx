import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { ReactNode } from 'react';

const CART_STORAGE_KEY = 'cart-items';

// Helper to wrap the hook with CartProvider
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
    });

    expect(result.current.cartItems).toEqual([{ productId: 1, quantity: 2 }]);
    expect(result.current.getItemCount()).toBe(2);
  });

  it('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(1, 3);
    });

    expect(result.current.cartItems).toEqual([{ productId: 1, quantity: 5 }]);
    expect(result.current.getItemCount()).toBe(5);
  });

  it('should add multiple different items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 3);
    });

    expect(result.current.cartItems).toHaveLength(2);
    expect(result.current.getItemCount()).toBe(5);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 3);
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toEqual([{ productId: 2, quantity: 3 }]);
    expect(result.current.getItemCount()).toBe(3);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems).toEqual([{ productId: 1, quantity: 5 }]);
    expect(result.current.getItemCount()).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
  });

  it('should remove item when quantity is set to negative', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.updateQuantity(1, -1);
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
  });

  it('should clear entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 3);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
  });

  it('should calculate cart total without discounts', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const products = [
      { productId: 1, price: 10, discount: undefined },
      { productId: 2, price: 20, discount: undefined },
    ];

    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 1);
    });

    const total = result.current.getCartTotal(products);
    expect(total).toBe(40); // (10 * 2) + (20 * 1)
  });

  it('should calculate cart total with discounts', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const products = [
      { productId: 1, price: 100, discount: 0.2 }, // 20% off = $80
      { productId: 2, price: 50, discount: 0.1 },  // 10% off = $45
    ];

    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 1);
    });

    const total = result.current.getCartTotal(products);
    expect(total).toBe(205); // (80 * 2) + (45 * 1)
  });

  it('should ignore items not found in products list when calculating total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const products = [
      { productId: 1, price: 10, discount: undefined },
    ];

    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(999, 5); // Product not in list
    });

    const total = result.current.getCartTotal(products);
    expect(total).toBe(20); // Only product 1
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(1, 2);
      result.current.addToCart(2, 3);
    });

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    expect(savedCart).toBeTruthy();
    const parsedCart = JSON.parse(savedCart!);
    expect(parsedCart).toEqual([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]);
  });

  it('should restore cart from localStorage on initialization', () => {
    // Pre-populate localStorage
    const initialCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual(initialCart);
    expect(result.current.getItemCount()).toBe(5);
  });

  it('should throw error when useCart is used outside CartProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');

    consoleSpy.mockRestore();
  });
});
