import React from 'react';
import { type Item } from '../types';

interface CartContextProps {
	items: Item[];
	totalAmount: number;
	addItem: (item: Item) => void;
	removeItem: (id: string) => void;
}

const CartContext = React.createContext<CartContextProps>({
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {},
});

export default CartContext;
