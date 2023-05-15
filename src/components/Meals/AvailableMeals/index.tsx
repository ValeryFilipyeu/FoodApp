import React from 'react';

import Card from '../../UI/Card';
import MealItem from '../MealItem';

import Meal from '../../../models/meal';

import classes from './index.module.css';

const DUMMY_MEALS = [
	new Meal('m1', 'Sushi', 'Fried, baked and with header', 24.99),
	new Meal('m2', 'Stake', 'Well done', 12.99),
	new Meal('m3', 'Juice', 'Orange', 1.99),
	new Meal('m4', 'Halva', 'Peanut', 2.99),
];

const AvailableMeals: React.FC<unknown> = () => {
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem key={meal.id} item={meal} />
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
