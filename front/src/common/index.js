import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'

// Components
import Toast from './Toast';
import Modal from './Modal';
import ProgressBar from 'components/ProgressBar';
import { getInfo, getCategories } from './../redux/core/actions';

import APP_CONSTANTS from 'constants/app';

// Common Component
const Common = ({ loading, getInfo, store, user, getCategories }) => {

	// useEffect(() => {
	// 	getCategories()
	// 	if (user.authentication.status === APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED) {
	// 		getInfo().then(res => {
	// 		}).catch(err => {
	// 			console.log(err)
	// 		})
	// 	}
	// }, []);
	return(
		<>
			<ProgressBar />
			<Toast />
			<Modal />
		</>
	);
};

/* Props ================================== */
Common.propTypes = {
	activeLoading: PropTypes.bool,
};

Common.defaultProps = {
	activeLoading: false,
};

/* Redux ========================================= */
const mapStateToProps = (store) => ({
	store: store,
	user: store.user
});

const mapDispatchToProps = {
	getInfo,
	getCategories
};

// /* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Common);
