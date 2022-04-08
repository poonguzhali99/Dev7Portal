import React, { lazy } from 'react';
const Dashboard = lazy(() => import('./src/pages/dashboard'));

const Home = lazy(() => import('./src/pages/Home'));

import Login from './src/pages/login';
export const routes = [
	{
		path: '/dashboard',
		name: 'Checklist',
		exact: true,
		icon: 'home',
		main: () => <Dashboard />
	}
	// {
	// 	path: '/home',
	// 	name: 'Home',
	// 	exact: true,
	// 	icon: 'home',
	// 	main: () => <Home />
	// }
];
