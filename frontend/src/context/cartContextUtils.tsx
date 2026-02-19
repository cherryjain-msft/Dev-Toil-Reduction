import { createContext } from 'react';
import { CartContextType } from '../types/cart';

export const CartContext = createContext<CartContextType | null>(null);
