import React, { useState, useEffect } from 'react';

import Card from '../../UI/Card';
import MealItem from '../MealItem';

import { type Meal } from '../../../types';
import { truthy } from '../../../utils';

import classes from './index.module.css';

const mealsUrl = 'https://react-native-a697c-default-rtdb.firebaseio.com';

const AvailableMeals: React.FC<unknown> = () => {
	const [meals, setMeals] = useState<Meal[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState('');

	useEffect(() => {
		const fetchMeals = async (): Promise<void> => {
			const response = await fetch(`${mealsUrl}/meals.json`);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const responseData = await response.json();

			const loadedMeals: Meal[] = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (truthy(httpError)) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
