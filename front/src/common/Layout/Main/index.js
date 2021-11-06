import React from 'react';
import PropTypes from 'prop-types';
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from 'next-seo';
import styled from 'styled-components';

// libs and constants
import Translation from 'libs/Translation';

// style
const Wrapper = styled.main`
	box-sizing: border-box;
    min-width: 0;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
	flex-direction: column;
	/* min-height: calc(100vh - 40px); */
	background-color: #fff;	
	padding: ${p => p.padding};
	@media (max-width: 800px) {
		margin-top: -60px;
	}
`;

// Main Component
const Main = ({ children, seo, breadCrumb, faq,...restProps }) => {
	const title = seo.title ? `${seo.title} | ${Translation.t('label.bookApo')}` : Translation.t('label.bookApo');
	const additionalMetaTags = seo.additionalMetaTags;
	if (seo.keywords) {
		additionalMetaTags.push({ name: 'keywords', content: seo.keywords });
	}
	const seoProps = {
		...seo,
		additionalMetaTags,
		title,
		openGraph: {
			title,
			...seo.openGraph,
		},
	};
	const bread = {
		...breadCrumb
	}
	const faQ = {
		...faq
	}
	return (
		<Wrapper {...restProps}>
			{seo ? <NextSeo {...seoProps} /> : null}
			{breadCrumb ? <BreadcrumbJsonLd {...bread} />: null}
			{faq ? <FAQPageJsonLd {...faQ} />: null}
			{children}
		</Wrapper>
	);
};

/* Props ================================== */
Main.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	padding: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	seo: PropTypes.shape(),
};

Main.defaultProps = {
	className: '',
	children: null,
	padding: '0 0',
	seo: {},
};

/* Export ================================== */
export default Main;
