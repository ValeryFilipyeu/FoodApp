import React from 'react';

import classes from './index.module.css';

const Card: React.FC<{ children: React.ReactNode }> = (props) => {
	return <div className={classes.card}>{props.children}</div>;
};

export default Card;
