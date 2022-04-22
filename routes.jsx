import React, { lazy } from 'react';


const Dashboard = lazy(() => import('./src/pages/dashboard'));

const Marksentry = lazy(() => import('./src/pages/marksentry'));
const Marksentrystatus = lazy(() => import('./src/pages/marksentrystatus'));
const Reportcard = lazy(() => import('./src/pages/reportcard'));
const Newadmissionsetup= lazy(()=>import('./src/pages/newadmissionsetup'));
const Newadmissioncount= lazy(()=>import('./src/pages/newadmissioncount'));
const Admissionplanning= lazy(()=>import('./src/pages/admissionplanning'));
const Consolidated= lazy(()=>import('./src/pages/consolidated'));

export const routes = [
	{
		path: '/dashboard',
		name: 'Checklist',
		exact: true,
		icon: 'home',
		main: () => <Dashboard />
	},
	 {
	 	path: '/marksentry',
		name: 'Assesment-Entry',
		exact: true,
		icon: 'home',
	 	main: () => <Marksentry />
	 },
	 {
		path: '/marksentrystatus',
	   name: 'Assesment-Entry-status',
	   exact: true,
	   icon: 'home',
	    main: () => <Marksentrystatus />
	},
	{
		path: '/reportcard',
	   name: 'Report-card',
	   exact: true,
	   icon: 'home',
	    main: () => <Reportcard />
	},
	{
		path: '/newadmissionsetup',
	   name: 'New-admission',
	   exact: true,
	   icon: 'home',
	    main: () => <Newadmissionsetup />
	},
	{
		path: '/newadmissioncount',
	   name: 'New-admission-count',
	   exact: true,
	   icon: 'home',
	    main: () => <Newadmissioncount />
	},
	{
		path: '/admissionplanning',
	   name: 'New-admission-planning',
	   exact: true,
	   icon: 'home',
	    main: () => <Admissionplanning />
	},
	{
		path: '/consolidated',
	   name: 'New-admission-conso',
	   exact: true,
	   icon: 'home',
	    main: () => <Consolidated />
	}
];
