import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// style
const Wrapper = styled.div`

	padding: 0 ${p => p.theme.layout_padding.sm};
	width: 100%;
	margin: 0 auto;
	position: relative;
	height: 100%;

	.width-lg & {
		@media (min-width: ${p => p.theme.breakpoint.lg}) {
			max-width: 1450px !important;
			padding-left: ${p => p.theme.layout_padding.lg};
			padding-right: ${p => p.theme.layout_padding.lg};
		}
	}

	.width-md & {
		@media (min-width: ${p => p.theme.breakpoint.lg}) {
			${p => p.readBook ? `
				max-width: 1000px !important;
			`:`
				max-width: 1250px !important;
			`}
			padding-left: ${p => p.theme.layout_padding.lg};
			padding-right: ${p => p.theme.layout_padding.lg};
		}
	}

	${p => p.sidebar && `

		display: flex;
		flex-direction: column;

		@media (min-width: ${p.theme.breakpoint.sm}) {
			flex-direction: row;

			.sidebar {
				width: 35% !important;
				[dir="ltr"] & { margin-right: 34px; }
				[dir="rtl"] & { margin-left: 34px; }
			}

			.sidebar + div {
				width: 65% !important;
			}
		}

		@media (min-width: ${p.theme.breakpoint.md}) {
			.sidebar {
				width: 30% !important;
				[dir="ltr"] & { margin-right: 60px; }
				[dir="rtl"] & { margin-left: 60px; }
			}

			.sidebar + div {
				width: 70% !important;
			}
		}
	`}
`;

// Container Component
const Container = ({ children, sidebar, readBook, ...rest }) => (
	<Wrapper sidebar={sidebar} {...rest} readBook={readBook}>
		{sidebar ? (
			<>
				<div className="sidebar">{children[0]}</div>
				{children[1]}
			</>
		) : children}
	</Wrapper>
);

/* Props ================================== */
Container.propTypes = {
	children: PropTypes.node,
	sidebar: PropTypes.bool,
	sidebarWidth: PropTypes.oneOf(['sm', 'md']),
	className: PropTypes.string,
};

Container.defaultProps = {
	children: null,
	sidebar: false,
	sidebarWidth: 'sm',
	className: '',
};

/* Export ================================== */
export default Container;
