import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';

import CartProvider from './store/CartProvider';

function App(): React.JSX.Element {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = (): void => {
		setCartIsShown(true);
	};

	const hideCartHandler = (): void => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
