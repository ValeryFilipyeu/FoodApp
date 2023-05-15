import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../../Cart/CartIcon';
import CartContext from '../../../store/cartContext';
import { truthy } from '../../../utils';

import classes from './index.module.css';

const HeaderCartButton: React.FC<{ onClick: () => void }> = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((curNumber, item) => {
		if (truthy(item.amount)) {
			return curNumber + item.amount;
		}

		return curNumber;
	}, 0);

	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ''
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
