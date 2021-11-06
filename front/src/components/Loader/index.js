import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

/* styles =================================== */
const Spinner = styled.div`
	${p => `
		width: ${p.size}px;
		height: ${p.size}px;
	`}

	svg {
		animation: rotate 2s linear infinite;

		circle {
			${p => `stroke: ${p.color ? p.color : p.theme.text_color.primary};`}
			stroke-linecap: round;
			animation: dash 1.4s ease-in-out infinite;
		}
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

const BAR_HEIGHT = '8px';
const Bar = styled.div`
	flex: 0 0 auto;
	display: flex;
	align-items: center;

	height: ${BAR_HEIGHT};
	border-radius: 20px;
	position: relative;
	background-color: #ebeff5;
	overflow: hidden;

	${p => `
		width: ${p.size + 130}px;
	`}

	&::before {
		content: '';
		display: block;
		flex: 0 0 auto;
		height: ${BAR_HEIGHT};
		border-radius: 20px;
		background-color: #c541a9;
		position: absolute;
		left: 0;
		animation: loading-bar;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-timing-function: ease-in-out;

		${p => `
			width: ${p.size + 40}px;
		`}
	}

	@keyframes loading-bar {
		0% {
			transform: translateX(-10%);
		}
		100% {
			transform: translateX(120%);
		}
	}
`;

const Dots = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	${p => `
		> div {
			border-radius: 50%;
			width: ${p.size}px;
			height: ${p.size}px;
			margin: 0 4px;
			background: ${p.color};

			animation-name: loading-dots;
			animation-duration: 0.4s;
			animation-timing-function: ease;
			animation-iteration-count: infinite;
			animation-direction: alternate-reverse;

			&:nth-child(1) { animation-delay: 0s; }
			&:nth-child(2) { animation-delay: 0.1s; }
			&:nth-child(3) { animation-delay: 0.2s; }
		}
	`}



	@keyframes loading-dots {
		0% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(0.9);
		}
	}
`;

/* Component ================================== */
const Loader = ({ color, size, strokeWidth, type }) =>
	type === 'spin' ?
		<Spinner color={color} size={size} className="loader">
			<svg width="100%" height="100%">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={size / 2 - strokeWidth}
					fill="none"
					strokeWidth={strokeWidth}
				></circle>
			</svg>
		</Spinner>

	: type === 'bar' ?
		<Bar color={color} size={size} className="loader"></Bar>

	:
		<Dots color={color} size={size} className="loader">
			<div />
			<div />
			<div />
		</Dots>
	

/* Props ================================== */
Loader.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
	strokeWidth: PropTypes.number,
	type: PropTypes.oneOf(['spin', 'bar', 'dots']),
};

Loader.defaultProps = {
	color: '#fff',
	size: 40,
	strokeWidth: 3,
	type: 'dots',
};

/* Export ================================== */
export default memo(Loader);
