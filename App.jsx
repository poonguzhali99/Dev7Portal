import React, { useState, useEffect, Fragment, Suspense, lazy } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { load } from 'react-cookies';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

//Components
import Spinner from './src/components/spinner';
import { routes } from './routes';
import Loader from './src/components/Loader';

//Others
import 'antd/dist/antd.css';
import 'assets/common_styles/fluent-ui.scss';
import 'assets/common_styles/style.scss';
import 'assets/common_styles/responsive.scss';
import 'react-notifications-component/dist/theme.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datetime/css/react-datetime.css';
import Login from './src/pages/login';

import { logIn, logOut } from './src/services/auth/action';
import { getUserDetails } from './src/utils/common-utils';
import Sidebar from './src/components/sidebar';

const App = React.memo(() => {
	const { SubMenu } = Menu;
	const { Header, Content, Sider } = Layout;

	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector(({ authReducer }) => {
		return {
			isLoggedIn: authReducer.isLoggedIn
		};
	}, shallowEqual);

	useEffect(() => {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
		validateAuth();
	}, []);
	const validateAuth = () => {
		const session = load('session');
		let userdetails = load('userdetails');
		console.log('userdetails', userdetails);
		// dispatch(getUserDetails(userDetails));
		if (session) {
			dispatch(logIn(session));
		} else {
			dispatch(logOut());
		}
	};

	useEffect(
		() => {
			if (isLoggedIn) {
				// dispatch(getAccessControl());
				// dispatch(getUserDetails());
				// dispatch(getStaticContent());
			}
		},
		[ isLoggedIn ]
	);

	const renderSection = () =>
		isLoggedIn ? (
			<section>
				<div className="d-flex">
					<Sidebar />
					<Switch>
						{routes.map((route, index) => (
							<Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
						))}
						<Redirect to="/dashboard" />
					</Switch>
				</div>
			</section>
		) : (
			<section>
				<Switch>
					<Route path={'/login'} component={Login} />
					<Redirect to={'/login'} />
				</Switch>
			</section>
		);
	return (
		<BrowserRouter>
			<Fragment>
				<ReactNotifications />
				<Suspense
					fallback={
						<Loader show={true} dark={true}>
							<div className="text-center" style={{ height: '100vh' }}>
								Loading...
							</div>
						</Loader>
					}
				>
					{renderSection()}
				</Suspense>
			</Fragment>
		</BrowserRouter>
	);
});

export default App;
