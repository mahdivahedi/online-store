import React from 'react';
import PropTypes from 'prop-types';

// constants and libs
import APP_ROUTES from 'constants/route';
import APP_CONSTANTS from 'constants/app';

// libs
import Routing from 'libs/Routing';
import Translation from 'libs/Translation';
import Util from 'libs/Util';

const { Link } = Routing.routes;

// Link Component
const CustomLink = ({
	children, to, params, ...restProps
}) => {
	const route = APP_ROUTES[to];

	// is Active Link
	// const router = useRouter();
	// let activeClass = '';
	// if (router.asPath.includes(route.path)) {
	// 	activeClass = 'active';
	// }

	// Create Params
	const newParams = { ...params };
	if (params && params.title) {
		newParams.title = Util.urlFriendlyTitle(params.title);
	}

	// Open in new screen
	const newProps = { ...restProps };
	if (route.blank) {
		// newProps.target = '_blank';
	}

	return (
		<>
			{
				newParams ?
				<Link to={to} params={newParams}>
					<a {...newProps}>
						{children}
					</a>
				</Link> :
				<Link to={to}>
					<a>
						{children}
					</a>
				</Link>
			}
		</>
	);
};

/* Props ================================== */
CustomLink.propTypes = {
	to: PropTypes.string.isRequired,
	params: PropTypes.shape(),
	children: PropTypes.node,
	className: PropTypes.string,
};

CustomLink.defaultProps = {
	params: {},
	children: null,
	className: '',
};

/* Export ================================== */
export default CustomLink;
