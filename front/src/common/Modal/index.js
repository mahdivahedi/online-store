import React from 'react';
import PropTypes from 'prop-types';

// Libs and Const
import APP_CONSTANTS from 'constants/app';
import ModalManager from 'libs/ModalManager';
import Util from 'libs/Util';
import Translation from 'libs/Translation';

// Components
import Icon from 'components/Icon';
import Text from 'components/Text';
import Button from 'components/Button';


// Styles
import Wrapper from './style';

/* Component ================================ */
class Modal extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			screens: [],
		};

		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
		this.pop2 = this.pop2.bind(this);
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this._handleOnOkClick = this._handleOnOkClick.bind(this);
		this._getLastModal = this._getLastModal.bind(this);
	}

	get _initialState() {
		return {
			content: null,
			title: '',
			message: '',
			size: 'md', // sm, md, lg
			closable: true,
			closeIcon: true,
		};
	}

	componentDidMount() {
		ModalManager.register(this);
	}

	componentWillUnmount() {
		ModalManager.unregister();
	}


	_handleKeyDown(event) {
		if (event.keyCode === APP_CONSTANTS.ESCAPE_KEY) {
			this.pop();
		}
	}

	push(newState) {
		document.addEventListener('keydown', this._handleKeyDown, false);
		const body = document.getElementsByTagName('body')[0];
		body.setAttribute('class', 'noscroll');

		let screens = [...this.state.screens];

		this.setState({
			screens: [
				...screens,
				{
					...this._initialState,
					...newState,
				},
			],
		});
	}

	_getLastModal() {
		const { screens } = this.state;

		return screens[screens.length - 1] || {};
	}

	pop(number = 1) {
		document.removeEventListener('keydown', this._handleKeyDown, false);
		let screens = [...this.state.screens];

		// if (!this._getLastModal().closable) {
		// 	return;
		// }

		if (typeof number === 'object') {
			number = 1;
		}

		screens = screens.slice(0, this.state.screens.length - number);

		if (screens.length === 0) {
			const body = document.getElementsByTagName('body')[0];
			body.removeAttribute('class', 'noscroll');
		}

		this.setState({ screens });
	}

	pop2(number = 1) {
		document.removeEventListener('keydown', this._handleKeyDown, false);
		let screens = [...this.state.screens];

		if (!this._getLastModal().closable) {
			return;
		}

		if (typeof number === 'object') {
			number = 1;
		}

		screens = screens.slice(0, this.state.screens.length - number);

		if (screens.length === 0) {
			const body = document.getElementsByTagName('body')[0];
			body.removeAttribute('class', 'noscroll');
		}

		this.setState({ screens });
	}

	_handleOnOkClick() {
		let screens = [...this.state.screens];
		screens[screens.length -1].loading = true;
		this.setState({ screens });

		this._getLastModal().onOk()
			.then(() => {
				this.pop();
			})
			.catch(() => {
				let screens = [...this.state.screens];
				screens[screens.length - 1].loading = false;
				this.setState({ screens });
			})
	}

	render() {
		if (this.state.screens.length === 0) return null;

		return (
			this.state.screens.map((screen, i) => (
				<Wrapper key={i} className={screen.size}>
					<div
						className="backdrop"
						onClick={this.pop2}
						onKeyPress={this.pop2}
						role="button"
						tabIndex={0}
					/>
					<div className="modal-box">

						{screen.title || screen.closeIcon ?
							<div className="head">
								{screen.title ?
									<Text size="l" weight="m" setLineHeight={false}>
										{Util.limitChars(screen.title, 50)}
									</Text>
								: null}
								{screen.closeIcon ? <button className="close-btn" onClick={this.pop2}>
									<Icon name="cross" type="custom" stroke="#222" strokeWidth="3" size={16} />
								</button> : null}
							</div>
						: null}

						{screen.message ?
							<div className="message">
								{screen.message}
							</div>
						:
							<div className="content">
								{screen.content}
							</div>
						}

						{screen.onOk || screen.onCancel ?
							<div className="foot">
								{screen.onOk ?
									<Button size="sm" outline color="dark" shadow={false} onClick={this._handleOnOkClick} loading={screen.loading}>
										{Translation.t('label.yes')}
									</Button>
								: null}

								{screen.onCancel ?
									<Button size="sm" color="dark" onClick={this.pop2}>
										{Translation.t('label.no')}
									</Button>
								: null}
							</div>
						:null}
					</div>
				</Wrapper>
			))
		);
	}
}

/* Props ================================== */
Modal.propTypes = {
};

Modal.defaultProps = {
};


/* Export ================================== */
export default Modal;
