import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';

// Actions
import { setLoadingAction } from 'redux/core/actions';

import './style.scss';

/* Component ================================== */
class ProgressBar extends React.Component {
	constructor(props) {
		super(props);
		this._timer = null;
		this._finishTimer = null;
	}

	componentDidMount() {
		const { finishDelay, startPosition } = this.props;
		NProgress.configure({
			startPosition,
			stopDelayMs: finishDelay,
		});

		Router.events.off('routeChangeStart', this.routeChangeStart);
		Router.events.off('routeChangeComplete', this.routeChangeEnd);
		Router.events.off('routeChangeError', this.routeChangeEnd);

		Router.events.on('routeChangeStart', this.routeChangeStart);
		Router.events.on('routeChangeComplete', this.routeChangeEnd);
		Router.events.on('routeChangeError', this.routeChangeEnd);

		setTimeout(() => {
			// const { setLoadingAction } = this.props;
			// setLoadingAction(false);
			const body = document.getElementsByTagName('body')[0];
			body.setAttribute('loaded', true);
		}, 2000);
	}

	shouldComponentUpdate() {
		return false;
	}

	routeChangeStart = () => {
		const { startPosition } = this.props;
		NProgress.set(startPosition);
		NProgress.start();
	};

	routeChangeEnd = () => {
		const { finishDelay } = this.props;
		// window.scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'auto',
		// });
		clearTimeout(this._finishTimer);
		this._finishTimer = setTimeout(() => {
			NProgress.done(true);
		}, finishDelay);
	};

	render() {
		return null;
	}
}

/* Props ================================== */
ProgressBar.propTypes = {
	finishDelay: PropTypes.number,
	startPosition: PropTypes.number,
	// setLoadingAction: PropTypes.func.isRequired,
};

ProgressBar.defaultProps = {
	finishDelay: 200,
	startPosition: 0.2,
};

/* Redux ================================== */
const mapStateToProps = () => ({

});

const mapDispatchToProps = {
	setLoadingAction,
};

/* Export ================================== */
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
