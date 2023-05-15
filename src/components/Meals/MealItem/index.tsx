import React, { useContext } from 'react';

import MealItemForm from '../MealItemForm';

import CartContext from '../../../store/cartContext';
import { type Item } from '../../../types';

import classes from './index.module.css';

const MealItem: React.FC<{ item: Item }> = (props) => {
	const cartCtx = useContext(CartContext);

	const { price: priceProp, id, name, description } = props.item;

	const price = `$${Number(priceProp).toFixed(2)}`;

	const contextPrice = Number(priceProp).toFixed(2);

	const addToCartHandler = (amount: number): void => {
		cartCtx.addItem({
			id,
			name,
			amount,
			price: +contextPrice,
			description,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{name}</h3>
				<div className={classes.description}>{description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
