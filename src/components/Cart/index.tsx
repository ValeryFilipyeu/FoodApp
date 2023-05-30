import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';

import CartContext from '../../store/cartContext';
import { type Item, type UserData } from '../../types';

const mealsUrl = 'https://react-native-a697c-default-rtdb.firebaseio.com';

const Cart: React.FC<{ onClose: () => void }> = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id: string): void => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item: Item): void => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = (): void => {
		setIsCheckout(true);
	};

	const submitOrderHandler = (userData: UserData): void => {
		setIsSubmitting(true);

		fetch(`${mealsUrl}/orders.json`, {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
		})
			.then(() => {
				setIsSubmitting(false);
				setDidSubmit(true);
				cartCtx.clearCart();
			})
			.catch(() => {});
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
