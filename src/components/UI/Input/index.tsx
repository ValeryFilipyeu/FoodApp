import React, { type LegacyRef } from 'react';

import { type InputData } from '../../../types';

import classes from './index.module.css';

function Input(
	props: { label: string; input: InputData },
	ref: LegacyRef<HTMLInputElement>
): React.JSX.Element {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
}

export default React.forwardRef(Input);
