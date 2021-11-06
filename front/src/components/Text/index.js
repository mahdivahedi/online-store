import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants and libs
const Com = styled.span`

	${p => p.breakText && `
		word-wrap: break-word;
	`}

	${p => p.c && `
		color: ${p.theme.text_color[p.c]};
	`}

	${p => p.s && `
		font-size: ${p.theme.font_size[p.s]};
	`}

	${p => p.s && p.setLineHeight && `
		line-height: ${parseInt(p.theme.font_size[p.s], 10) * p.theme.line_height_scale}px;
	`}

	${p => p.w && `
		font-weight: ${p.theme.font_weight[p.w]};
	`}

	${p => p.decoration && p.decoration === 'underline' && `
		border-bottom: 1px solid ${p.c ? p.theme.text_color[p.c] : '#666'};
		padding-bottom: 2px;
		display: inline-block;
		cursor: pointer;
	`}

	${p => p.badge && `
		color: #fff;
		background: ${p.theme.badge_color[p.c]};
		border-radius: ${p.theme.border_radius.sm};
		padding: 2px 6px;
		font-weight: ${p.theme.font_weight.m}
	`}
`;

// Text Component
const Text = props => {
	const {
		tag,
		color,
		weight,
		size,
		children,
		...rest
	} = props;

	return (
		<Com {...rest} as={tag} c={color} w={weight} s={size}>
			{children}
		</Com>
	);
};

/* Props ================================== */
Text.propTypes = {
	tag: PropTypes.oneOf([
		'div',
		'span',
		'p',
		'a',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	]),
	// oneOf(['danger', 'primary', 'secondary', 'ddd', 'dd', 'd', 'n', 'l', 'll', 'lll', 'green']),
	color: PropTypes.string,
	weight: PropTypes.oneOf(['ll', 'l', 'm', 'b']),
	size: PropTypes.oneOf([
		'sss',
		'ss',
		's',
		'n',
		'l',
		'll',
		'lll',
		'lll',
		'llll',
		'lllll',
	]),
	decoration: PropTypes.string,
	children: PropTypes.node,
	breakText: PropTypes.bool,
	setLineHeight: PropTypes.bool,
};

Text.defaultProps = {
	tag: 'span',
	color: null,
	weight: null,
	size: null,
	decoration: null,
	children: null,
	breakText: null,
	setLineHeight: true,
};

/* Export ================================== */
export default Text;
