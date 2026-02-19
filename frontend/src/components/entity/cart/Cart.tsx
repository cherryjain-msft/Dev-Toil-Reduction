import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import CartItem from './CartItem';

interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.products}`);
  return data;
};

export default function Cart() {
  const { darkMode } = useTheme();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-red-500 text-center">Failed to fetch products</div>
        </div>
      </div>
    );
  }

  // Join cart items with product data
  const cartWithProducts = cartItems
    .map((item) => {
      const product = products?.find((p) => p.productId === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);

  const isEmpty = cartWithProducts.length === 0;
  const cartTotal = products ? getCartTotal(products) : 0;

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1
              className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
            >
              Shopping Cart
            </h1>
            {!isEmpty && (
              <button
                onClick={clearCart}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-red-600 text-light' : 'bg-gray-200 hover:bg-red-500 text-gray-800 hover:text-white'} transition-colors duration-300`}
                aria-label="Clear cart"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Empty State */}
          {isEmpty && (
            <div
              className={`flex flex-col items-center justify-center text-center py-20 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              role="status"
              aria-live="polite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-16 w-16 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className={`${darkMode ? 'text-light' : 'text-gray-800'} text-xl font-medium mb-2`}>
                Your cart is empty
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Add some products from our catalog to get started!
              </p>
              <a
                href="/products"
                className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Products
              </a>
            </div>
          )}

          {/* Cart Items */}
          {!isEmpty && (
            <>
              <div className="space-y-4">
                {cartWithProducts.map(({ product, quantity }) => (
                  <CartItem
                    key={product.productId}
                    product={product}
                    quantity={quantity}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <div
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md transition-colors duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
                  >
                    Cart Summary
                  </h2>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                      Items in cart:
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="border-t pt-2 border-gray-300 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center transition-colors duration-300`}>
                  Checkout functionality coming soon!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
