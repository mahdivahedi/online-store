import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

// libs and constants
import APP_CONSTANTS from 'constants/app';
import APP_ROUTES from 'constants/route';
import Translation from 'libs/Translation';
import Routing, { matchRoute } from 'libs/Routing';
import Router from 'next/router';

// styles
import Header from 'common/Layout/Header';
import Footer from 'common/Layout/Footer';

// Styles
const Wrapper = styled.div`
	min-height: 120vh !important;
	background-color: rgb(247, 247, 247);
	height: auto;
	box-sizing: border-box;
	position: relative;
    margin: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
	padding-bottom: 300px;

	${p => p.headerPadding && `
		// padding-top: 120px;
		@media (min-width: ${p.theme.mobile_width}) {
		}
	`}
`;

const defaultSettings = {
	auth: false,
	private: false,
	tabbar: true,
	footer: {},
	width: 'md', // sm, md, lg, xlg
	header: {
		main: false,
		fixed: -1, // fixed at start
		initialTheme: 'light', // light, dark, transparent, light-shadow
		fixedTheme: 'light', // light, dark, transparent, light-shadow
	},
};

/* Page Component ================================== */
const Page = ({
	children,
	error,
	authStatus,
	router,
}) => {
	const { asPath } = router;

	const indexOfQuestion = asPath.indexOf('?');
    // const fullUrl = Routing.makeUrlWithNewLang(asPath, lang);
    const fullUrl = asPath; 

	let path = asPath;
	if (indexOfQuestion > 0) {
		path = asPath.slice(0, indexOfQuestion);
	}

	const routeName = error ? `${error}` : matchRoute(path);
	const routeObject = APP_ROUTES[routeName || '404'] || {};

	const settings = {
		...defaultSettings,
		...routeObject,
	};

	if (typeof routeObject.header === 'undefined') {
		settings.header = {
			...defaultSettings.header,
			...routeObject.header,
		};
	}

	if (typeof routeObject.footer === 'undefined') {
		settings.footer = {
			...defaultSettings.footer,
			...routeObject.footer,
		};
	}

	const redirectToHome = authStatus !== APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED
		&& settings.private;

		console.log(redirectToHome)

	useEffect(() => {
		if (redirectToHome) {
			Router.push('/')
			// router.replace('home', { redirect: asPath });
		}
	});

	if (redirectToHome) {
		return null;
	}

	let headerPadding = false;
	if (settings.header && settings.header.initialTheme !== 'transparent') {
		headerPadding = true;
	}

	const title = `${Translation.t(`title.${routeName}`)} | ${Translation.t('label.bookApo')}`;
	// const desc = `${Translation.t(`title.${routeName}`)} | ${Translation.t('label.tourlin')}`;

	return (
		<Wrapper id="main-container" className={`width-${settings.width}`} headerPadding={headerPadding}>
			<Head>
				<link rel="shortcut icon" type="image/x-icon" href={`/assets/images/logo-blue.png`} />
				<base href={APP_CONSTANTS.SITE_URL}></base>
				{/* TODO: MAKE ALTERNATE LANGUAGES WORK */}
				{/* {routeName !== 'tour' ? Object.keys(APP_CONSTANTS.LANG).map(l => (
					<link key={l} rel="alternate" hrefLang={l} href={Routing.makeUrlWithNewLang(asPath, l)} />
				)) : null} */}
			</Head>
			<DefaultSeo
				title={title}
				description={Translation.t('label.bookApo')}
				canonical={fullUrl}
				additionalMetaTags={[
					{ name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
					{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
					{ name: 'theme-color', content: '#3256A6'},
					{ name: 'google-site-verification', content: 'epPqVVyf5hq-VaOzcEkNKISwqCPQMxu0fwg4PFsXqaQ'},
					{ name: 'msvalidate.01', content: '0EF6911C6DDF250F42A1B23A8276FC6B'},
					{ name: 'description', content: `${Translation.t('label.bookApo_desc')}`},
					{ name: 'generator', content: 'بوکاپو'},
					{ name: '', content: ''},
				]}
				openGraph={{
					type: 'website',
					title,
					site_name: 'بوکاپو',
					url: fullUrl,
					locale: 'fa_IR',
					images: [
						{
							url: `${APP_CONSTANTS.SITE_URL}/assets/images/logo-blue.png`,
							alt: `${Translation.t('label.bookApo')}`,
						},
					],
				}}
				twitter={{
					site: '@bookapo_com',
					creator: '@bookapo_com',
					cardType: 'summary_large_image',
				}}
			/>

			{<Header {...settings.header} query={router} />}
            <div>
                {children}
            </div>
			{settings.footer ? <Footer {...settings.footer} /> : null}
		</Wrapper>
	);
};

/* Props ================================== */
Page.propTypes = {
	authStatus: PropTypes.string.isRequired,
	error: PropTypes.number,
	router: PropTypes.shape({
		asPath: PropTypes.string.isRequired,
		query: PropTypes.shape().isRequired,
	}).isRequired,

	children: PropTypes.node,
};

Page.defaultProps = {
	children: null,
	error: null,
};

/* Redux ================================== */
const mapStateToProps = store => ({
	authStatus: store.user.authentication.status,
});

const mapDispatchToProps = {
};

/* Export ================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Page);
