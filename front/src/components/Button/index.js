import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import lodashDebounce from 'lodash.debounce';

import APP_CONSTANTS from 'constants/app';
import Icon from '../Icon';
import Loader from '../Loader';

// constants and libs
const Wrapper = styled.button`

	position: relative;
	word-wrap: break-word !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
	cursor: pointer;

	display: inline-flex;
	justify-content: center;
	align-items: center;
	word-wrap: keep-all;

	${p => p.shadow && `
		box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1),0px 2px 10px 0px rgba(0,0,0,0.08);
	`};

	${p => {
		const type = p.outline ? `${p.color}_o` : p.color;
		const {
			active,
			disabled,
			hover,
			bg,
			border,
			text,
		} = p.theme.button_color[type];

		return `
			background-color: ${bg};
			border: 1px solid ${border};
			color: ${text};
			transition: all 100ms ease;

			${disabled ? `
				&:active {
					${disabled.bg && `background-color: ${disabled.bg};`}
					${disabled.border && `border-color: ${disabled.border};`}
					${disabled.text && `color: ${disabled.text};`}
				};
			` : ''}

			${hover ? `
				&:hover {
					${hover.bg && `background-color: ${hover.bg};`}
					${hover.border && `border-color: ${hover.border};`}
					${hover.text && `color: ${hover.text};`}
				};
			` : ''}

			${active ? `
				&:active {
					${active.bg && `background-color: ${active.bg};`}
					${active.border && `border-color: ${active.border};`}
					${active.text && `color: ${active.text};`}
				};
			` : ''}
			
		`;
	}}

	.form {
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	${p => (p.size === 'sm' ? `
			padding: 7px 15px;
			line-height: 18px;
			font-size: ${p.theme.font_size.n};
		`

		: p.size === 'md' ? `
			padding: 10px 20px;
			line-height: 24px;
			font-size: ${p.theme.font_size.l};
		`

			: p.size === 'lg' ? `
			padding: 15px 25px;
			line-height: 30px;
			font-size: ${p.theme.font_size.ll};
		` : '')
}

	${p => p.wide && `
		padding-left: 45px;
		padding-right: 45px;
	`}

	${p => p.fullWidth && `
		width: 100%;
		min-width: 72px;
	`}


	${p => p.disabled && `
		opacity: 0.3;
		cursor: not-allowed;
	`}


	${p => p.shadow && `
		box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1),0px 2px 10px 0px rgba(0,0,0,0.08);
	`};

	border-radius: ${p => p.theme.border_radius[p.radius]};

	${p => p.isLoading && `
		opacity: 0.8;
		cursor: not-allowed;
		.content {
			visibility: hidden;
		}
	`};

	.content {
		pointer-events: none;
	}

	.icon {
		[dir="ltr"] & { margin-right: 7px; margin-left: 3px; };
		[dir="rtl"] & { margin-left: 7px; margin-right: -3px; };
	}

	.loading {
		position: absolute;
	}

	a {
		display: inline-block;
		/* position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center; */
	}
`;

// Button Component
const Button = ({
	tag,
	children,
	debounce,
	iconName,
	iconType,
	loading,
	onClick,
	disabled,
	outline,
	...rest
}) => {
	const handleClick = useCallback(
		lodashDebounce(event => {
			if (onClick && !loading) onClick(event);
		}, debounce ? APP_CONSTANTS.DEBOUNCE_DELAY : 0, { leading: true, trailing: false }),
		[loading, onClick],
	);

	return (
		<Wrapper as={tag} type="button" {...rest} outline={outline} isLoading={loading} disabled={disabled} onClick={handleClick}>
			{loading ? (
				<div className="loading">
					<Loader color={outline ? '#555' : '#fff'} type="dots" size={8} strokeWidth={2} />
				</div>
			) : null}

			<div className="content">
				{iconName ? <Icon name={iconName} type={iconType} color="#fff" size={15} /> : null}
				{children}
			</div>
		</Wrapper>
	);
};

/* Props ================================== */
Button.propTypes = {
	tag: PropTypes.oneOf(['button', 'a', 'span']),
	color: PropTypes.oneOf(['darker', 'dark', 'grey', 'green', 'light', 'primary', 'secondary', 'success', 'error']),
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
	radius: PropTypes.oneOf(['sm', 'md', 'lg']),
	iconType: PropTypes.string,
	shadow: PropTypes.bool,
	fullWidth: PropTypes.bool,
	wide: PropTypes.bool,
	outline: PropTypes.bool,
	iconName: PropTypes.string,
	loading: PropTypes.bool,
	debounce: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	tag: 'button',
	color: 'secondary',
	size: 'md',
	radius: 'sm',
	iconType: 'custom',
	shadow: true,
	fullWidth: false,
	wide: false,
	outline: false,
	iconName: null,
	loading: false,
	debounce: true,
	children: null,
	onClick: null,
	disabled: false,
};

/* Export ================================== */
export default Button;
