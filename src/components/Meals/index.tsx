import React from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals: React.FC<unknown> = () => {
	return (
		<>
			<MealsSummary />
			<AvailableMeals />
		</>
	);
};

export default Meals;
