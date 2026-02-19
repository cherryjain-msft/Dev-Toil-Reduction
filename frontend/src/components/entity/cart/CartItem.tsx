import { useTheme } from '../../../context/ThemeContext';

interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  discount?: number;
}

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const { darkMode } = useTheme();
  
  const hasDiscount = product.discount != null && product.discount > 0;
  const unitPrice = hasDiscount
    ? product.price * (1 - product.discount!)
    : product.price;
  const lineTotal = unitPrice * quantity;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, quantity + change);
    onUpdateQuantity(product.productId, newQuantity);
  };

  return (
    <div
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md transition-colors duration-300`}
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div
          className={`flex-shrink-0 w-24 h-24 ${darkMode ? 'bg-gradient-to-t from-gray-700 to-gray-800' : 'bg-gradient-to-t from-gray-100 to-white'} rounded-lg p-2 transition-colors duration-300`}
        >
          <img
            src={`/${product.imgName}`}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <h3
            className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-1 transition-colors duration-300`}
          >
            {product.name}
          </h3>
          <p
            className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}
          >
            {product.description}
          </p>

          {/* Price Information */}
          <div className="flex items-center gap-2 mb-3">
            {hasDiscount ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-primary font-bold">
                  ${unitPrice.toFixed(2)}
                </span>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                  {Math.round(product.discount! * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-primary font-bold">
                ${unitPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity Controls & Remove */}
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}
            >
              <button
                onClick={() => handleQuantityChange(-1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                aria-label={`Decrease quantity of ${product.name}`}
              >
                <span aria-hidden="true">-</span>
              </button>
              <span
                className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
                aria-label={`Quantity of ${product.name}`}
              >
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                aria-label={`Increase quantity of ${product.name}`}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            {/* Line Total & Remove Button */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-500">Subtotal</div>
                <div className="text-lg font-bold text-primary">
                  ${lineTotal.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onRemove(product.productId)}
                className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-red-500 hover:bg-gray-700' : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'} transition-colors duration-300`}
                aria-label={`Remove ${product.name} from cart`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
