import React from 'react';
import PropTypes from 'prop-types';

// constants and libs
// import ToastManager from 'libs/ToastManager';
import { Wrapper, ToastWrapper } from './style';


/* Toast Component ====================== */
class Toast extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toasts: [],
		};

		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
	}

	get _initialState() {
		return {
			message: '',
			type: 'error',
		};
	}

	componentDidMount() {
		// ToastManager.register(this);
	}

	componentWillUnmount() {
		// ToastManager.unregister();
	}

	push(newState) {
		let toasts = [...this.state.toasts];

		this.setState({
			toasts: [
				...toasts,
				{
					...this._initialState,
					...newState,
				},
			],
		});
	}

	pop(number = 1) {
		if (typeof number === 'object') {
			number = 1;
		}

		let toasts = [...this.state.toasts];
		toasts = toasts.slice(0, this.state.toasts.length - number);
		this.setState({ toasts });
	}

	render() {
		if (this.state.toasts.length === 0) return null;

		return (
			<Wrapper>
				{this.state.toasts.map((toast, i) => (
					<ToastWrapper key={i} className="toast" type={toast.type}>
						<div>
							{toast.message}
						</div>
					</ToastWrapper>
				))}
			</Wrapper>
		)
	}
}

/* Props ========================================= */
Toast.propTypes = {
};

Toast.defaultProps = {
};


/* Export ===================================== */
export default Toast;



