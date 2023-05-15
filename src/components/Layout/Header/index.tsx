import React from 'react';

import HeaderCartButton from '../HeaderCartButton';

import classes from './index.module.css';

const Header: React.FC<{ onShowCart: () => void }> = (props) => {
	return (
		<>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img
					src={require('../../../assets/meals.jpg')}
					alt="A table full of delicious food!"
				/>
			</div>
		</>
	);
};

export default Header;
