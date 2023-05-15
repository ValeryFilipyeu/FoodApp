import React from 'react';

import classes from './index.module.css';

import { type Item } from '../../../types';

const CartItem: React.FC<{
	item: Item;
	onRemove: (id: string) => void;
	onAdd: (item: Item) => void;
}> = (props) => {
	const { price: priceProp, name, id, amount } = props.item;

	const price = `$${Number(priceProp).toFixed(2)}`;

	return (
		<li className={classes['cart-item']}>
			<div>
				<h2>{name}</h2>
				<div className={classes.summary}>
					<span className={classes.price}>{price}</span>
					<span className={classes.amount}>x {amount}</span>
				</div>
			</div>
			<div className={classes.actions}>
				<button
					onClick={() => {
						props.onRemove(id);
					}}
				>
					−
				</button>
				<button
					onClick={() => {
						props.onAdd(props.item);
					}}
				>
					+
				</button>
			</div>
		</li>
	);
};

export default CartItem;
