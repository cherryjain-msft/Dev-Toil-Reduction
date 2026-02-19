## Plan: Client-Side Shopping Cart

A frontend-only cart feature using React Context + `localStorage` for persistence. Cart items reference products by ID; prices are always computed from live product data. No checkout flow — just add, update quantity, and remove items. No new API endpoints or database tables required.

**Steps**

1. **Create cart types** in a new file `frontend/src/types/cart.ts`
   - Define `CartItem` interface: `{ productId: number; quantity: number }`
   - Define `CartContextType` interface: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getCartItems`, `getItemCount`, `getCartTotal` (takes products array to compute live prices)

2. **Create `CartContext` + `CartProvider`** in `frontend/src/context/CartContext.tsx`
   - Initialize state from `localStorage` on mount
   - Sync state to `localStorage` on every change (via `useEffect`)
   - `addToCart(productId, quantity)` — adds or increments existing item
   - `removeFromCart(productId)` — removes item
   - `updateQuantity(productId, quantity)` — sets exact quantity (removes if 0)
   - `clearCart()` — empties cart
   - `getItemCount()` — returns total item count (sum of quantities)
   - Export a `useCart()` convenience hook

3. **Wire `CartProvider` into the app** in `frontend/src/App.tsx`
   - Wrap the app tree with `<CartProvider>` alongside existing `AuthProvider` and `ThemeProvider`

4. **Create Cart page component** at `frontend/src/components/entity/cart/Cart.tsx`
   - Fetch products via React Query (reuse existing `fetchProducts` pattern from `Products.tsx`)
   - Join cart items with product data to display name, image, price, discount, and computed line totals
   - Per-item: quantity +/- controls, remove button
   - Cart total computed from live product prices (applying discount where present)
   - Empty state message when cart is empty
   - "Clear Cart" button
   - Follow existing Tailwind styling + dark mode patterns via `useTheme()`

5. **Create CartItem subcomponent** at `frontend/src/components/entity/cart/CartItem.tsx`
   - Renders a single row/card: product image, name, unit price (with discount), quantity controls, line total, remove button
   - Reuses the quantity +/- pattern already present in `Products.tsx`

6. **Add cart icon with badge to navigation** in `frontend/src/components/Navigation.tsx`
   - Add a cart icon (SVG or emoji) next to existing nav links
   - Show badge with `getItemCount()` when count > 0
   - Links to `/cart` route

7. **Add `/cart` route** in `frontend/src/App.tsx`
   - Add `<Route path="/cart" element={<Cart />} />` alongside existing routes

8. **Replace the `handleAddToCart` stub** in `frontend/src/components/entity/product/Products.tsx`
   - Import and use `useCart()` hook
   - Replace the `alert(...)` call with `addToCart(product.productId, quantity)`
   - Add a brief toast/notification or visual feedback on add (can be a simple temporary state change on the button)

9. **Write tests**
   - Unit test for `CartContext`: add, remove, update, clear, localStorage persistence — in `frontend/src/context/CartContext.test.tsx` using `@testing-library/react` + `renderHook`
   - Component test for Cart page: renders items, updates quantity, removes items, shows empty state — in `frontend/src/components/entity/cart/Cart.test.tsx`

**Verification**
- Run `npm run build --workspace=frontend` to ensure no type/build errors
- Run `npm test --workspace=frontend` to validate unit + component tests
- Manual checks: add products from `/products` page → navigate to `/cart` → verify items, quantities, live prices, remove, clear → refresh page → verify localStorage persistence → verify badge count in nav

**Decisions**
- Client-side only: no backend changes, no new DB tables or API routes
- Anonymous session: no user identity; one cart per browser via `localStorage`
- No checkout: cart is view/manage only; checkout can be layered on later
- Live pricing: cart stores only `productId` + `quantity`; prices always derived from the product catalog at render time
