import React, { useRef, useState, type FormEvent } from 'react';

import Input from '../../UI/Input';

import { truthy } from '../../../utils';

import classes from './index.module.css';

const MealItemForm: React.FC<{
	id: string;
	onAddToCart: (enteredAmountNumber: number) => void;
}> = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef<HTMLInputElement>(null);

	const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const enteredAmount = amountInputRef.current?.value;

		if (truthy(enteredAmount)) {
			if (
				enteredAmount.trim().length === 0 ||
				Number(enteredAmount) < 1 ||
				Number(enteredAmount) > 5
			) {
				setAmountIsValid(false);
				return;
			}

			props.onAddToCart(Number(enteredAmount));
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
