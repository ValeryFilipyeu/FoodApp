import React from 'react';
import ReactDOM from 'react-dom';

import classes from './index.module.css';

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal: React.FC<{
	onClose: () => void;
	children: React.ReactNode;
}> = (props) => {
	return (
		<>
			{portalElement != null &&
				ReactDOM.createPortal(
					<Backdrop onClose={props.onClose} />,
					portalElement
				)}
			{portalElement != null &&
				ReactDOM.createPortal(
					<ModalOverlay>{props.children}</ModalOverlay>,
					portalElement
				)}
		</>
	);
};

export default Modal;
