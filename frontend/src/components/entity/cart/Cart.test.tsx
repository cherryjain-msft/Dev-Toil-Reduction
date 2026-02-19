import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from './Cart';
import { CartProvider } from '../../../context/CartContext';
import { ThemeProvider } from '../../../context/ThemeContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock products data
const mockProducts = [
  {
    productId: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    imgName: 'product1.png',
    sku: 'SKU001',
    unit: 'unit',
    supplierId: 1,
    discount: 0.2, // 20% off
  },
  {
    productId: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 50,
    imgName: 'product2.png',
    sku: 'SKU002',
    unit: 'unit',
    supplierId: 1,
  },
];

// Helper to render Cart with all necessary providers
const renderCart = (initialCart: any[] = []) => {
  // Set initial cart in localStorage
  localStorage.setItem('cart-items', JSON.stringify(initialCart));

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <Cart />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Cart Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Mock successful products fetch
    (axios.get as any).mockResolvedValue({
      data: mockProducts,
    });
  });

  it('should render cart heading', async () => {
    renderCart();
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();
    });
  });

  it('should show empty state when cart is empty', async () => {
    renderCart([]);

    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/add some products from our catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/browse products/i)).toBeInTheDocument();
  });

  it('should render cart items', async () => {
    const initialCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('should display correct prices with discount', async () => {
    const initialCart = [{ productId: 1, quantity: 1 }];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
    
    // Check for 20% OFF badge
    expect(screen.getByText('20% OFF')).toBeInTheDocument();
  });

  it('should calculate cart total correctly', async () => {
    const initialCart = [
      { productId: 1, quantity: 2 }, // 100 * 0.8 * 2 = 160
      { productId: 2, quantity: 1 }, // 50 * 1 = 50
    ];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('$210.00')).toBeInTheDocument(); // Total
    });
  });

  it('should show correct item count', async () => {
    const initialCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument(); // Item count
    });
  });

  it('should increase item quantity', async () => {
    const user = userEvent.setup();
    const initialCart = [{ productId: 1, quantity: 2 }];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Find and click the + button
    const increaseButton = screen.getByLabelText(/increase quantity of product 1/i);
    await user.click(increaseButton);

    // Total should increase (3 * 80 = 240)
    await waitFor(() => {
      const totals = screen.getAllByText(/\$240\.00/);
      expect(totals.length).toBeGreaterThan(0);
    });
  });

  it('should decrease item quantity', async () => {
    const user = userEvent.setup();
    const initialCart = [{ productId: 1, quantity: 2 }];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Find and click the - button
    const decreaseButton = screen.getByLabelText(/decrease quantity of product 1/i);
    await user.click(decreaseButton);

    // Total should decrease (1 * 80 = 80)
    await waitFor(() => {
      const totals = screen.getAllByText(/\$80\.00/);
      expect(totals.length).toBeGreaterThan(0);
    });
  });

  it('should remove item when quantity reaches 0', async () => {
    const user = userEvent.setup();
    const initialCart = [{ productId: 1, quantity: 1 }];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Click - button to reduce quantity to 0
    const decreaseButtons = screen.getAllByLabelText(/decrease quantity/i);
    await user.click(decreaseButtons[0]);

    // Item should be removed, showing empty state
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  it('should remove item when remove button is clicked', async () => {
    const user = userEvent.setup();
    const initialCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Click remove button
    const removeButtons = screen.getAllByLabelText(/remove.*from cart/i);
    await user.click(removeButtons[0]);

    // First product should be removed
    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
    
    // Second product should still be there
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should clear entire cart when clear button is clicked', async () => {
    const user = userEvent.setup();
    const initialCart = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Click clear cart button
    const clearButton = screen.getByRole('button', { name: /clear cart/i });
    await user.click(clearButton);

    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  it('should not show clear button when cart is empty', async () => {
    renderCart([]);

    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /clear cart/i })).not.toBeInTheDocument();
  });

  it('should handle API error gracefully', async () => {
    (axios.get as any).mockRejectedValue(new Error('API Error'));
    
    renderCart([{ productId: 1, quantity: 1 }]);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
    });
  });

  it('should show checkout message', async () => {
    const initialCart = [{ productId: 1, quantity: 1 }];
    
    renderCart(initialCart);

    await waitFor(() => {
      expect(screen.getByText(/checkout functionality coming soon/i)).toBeInTheDocument();
    });
  });
});
