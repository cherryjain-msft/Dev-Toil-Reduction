export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCartTotal: (products: { productId: number; price: number; discount?: number }[]) => number;
}
