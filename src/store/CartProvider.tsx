import React, { useReducer } from 'react';

import CartContext from './cartContext';
import { type Item } from '../types';
import { truthy } from '../utils';

type ActionType = { type: 'ADD'; item: Item } | { type: 'REMOVE'; id: string };

interface CartState {
	items: Item[];
	totalAmount: number;
}

const defaultCartState: CartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state: CartState, action: ActionType): CartState => {
	if (action.type === 'ADD' && truthy(action.item.amount)) {
		const updatedTotalAmount =
			state.totalAmount + Number(action.item.price) * action.item.amount;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (truthy(existingCartItem.amount)) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - Number(existingItem.price);
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else if (truthy(existingItem.amount)) {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems ?? [],
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = (props: {
	children: React.ReactNode;
}): React.JSX.Element => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item: Item): void => {
		dispatchCartAction({ type: 'ADD', item });
	};

	const removeItemFromCartHandler = (id: string): void => {
		dispatchCartAction({ type: 'REMOVE', id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
