import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavbarText, Navbar, NavbarBrand, Nav, NavItem, Row, Col } from 'reactstrap';
import { useHistory, Link, NavLink } from 'react-router-dom';
import _get from 'lodash/get';

//others
import './style.scss';
import home from '../../assets/images/home.png';
import erplogo from '../../assets/images/erp-logo.png';
// import { getAppText as AppText } from '../../language';
import logoutIcon from '../../assets/images/logoutIcon.svg';
import { logOut } from '../../services/auth/action';
import Sidebar from '../sidebar';
import SideNav from './side-nav';
import About from '../../pages/about-us';


import { Layout, Menu, Breadcrumb } from 'antd';
const Header = () => {
	const [logo, setLogo]=useState("https://dev7.ae-erp.in/img/bplog.png");
	let pathName = window.location.pathname;
	console.log(pathName);
	const { Header, Content, Footer } = Layout;
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector(({ authReducer }) => {
		return {
			isLoggedIn: authReducer.isLoggedIn
		};
	}, shallowEqual);
	const history = useHistory();

	const navigateToDashboard = () => {
		history.push('/');
	};
	useEffect(()=> {
		
		if (pathName == '/SLESBP') {
		   setLogo("https://dev2.ae-erp.in/Content/img/SLESBPLOGO.png");
		}
	}, [pathName])

	return (
		<Layout>
			{isLoggedIn ? (
				<Header className="header">
				<div className="logo1 ">
						<img src="https://dev2.ae-erp.in/Content/img/SLESBPLOGO.png" className="img" />
					</div> 
					<Menu
						className="bg-primary w-100 text-white align-items-center justify-content-end"
						mode="horizontal"
					>
						<Menu.Item key="1">Home</Menu.Item>
						<Menu.Item key="2">Communication</Menu.Item>
						<Menu.Item key="3">Edit Profile</Menu.Item>
						<Menu.Item key="4" onClick={() => dispatch(logOut())}>
							Logout
						</Menu.Item>
					</Menu>
					<NavLink to="./About">
					<img src={erplogo} className="img"   />
					</NavLink>
					
				</Header>
			) : (


			
				<Header className="header" style={{backgroundColor:"#ce0d13"}}>
					 <div className="logo1 ">
						 <NavLink to="./home">
						 <img src={logo} className="img" />
						 </NavLink>
						
					</div> 
					<Menu
						className="bg-red w-100 text-white align-items-center justify-content-end"
						mode="horizontal"
					>
						<Menu.Item key="1" onClick={() => history.push('/About')} >About Us</Menu.Item>
						<Menu.Item key="2" onClick={() => history.push('/Privacy')}>Privacy</Menu.Item>
						<Menu.Item key="3"  onClick={() => history.push('/Terms')}>Terms & Conditions</Menu.Item>
						<Menu.Item key="4">Contact Us</Menu.Item>
					</Menu>
					<div className="logo1 ">
						 <NavLink to="./home">
						 <img src="https://dev7.ae-erp.in/img/bplog.png" className="img" />
						 </NavLink>
						
					</div> 
				</Header>
			)}
		</Layout>
	);

	// return (
	// 	<div>
	// 		<Navbar className="header" color="primary" expand="md" fixed="top">
	// 			<Nav>
	// 				<div className="my-3 mx-3">
	// 					<SideNav />
	// 				</div>
	// 				<NavbarBrand href="/">
	// 					<img src={home} className="header_logo" alt="Logo" />
	// 				</NavbarBrand>
	// 				<NavbarText className="text-light cursor_p d-flex align-items-center" onClick={navigateToDashboard}>
	// 					<h5>ANDREWS SCHOOL, HYDERABAD</h5>
	// 				</NavbarText>
	// 			</Nav>
	// 			<Nav className="align-items-center">
	// 				<NavbarText>
	// 					<small className="text-light me-2">Hello! </small>
	// 				</NavbarText>
	// 				<NavbarText className="text-light">Suresh Reddy</NavbarText>
	// 				<NavItem className="user_logo"> SR </NavItem>
	// 				<div className="vl" />
	// 				<NavItem>
	// 					<Link className="text-light text-decoration-none" to="/login" onClick={logOut}>
	// 						<img title={'Logout'} width="30px" height="30px" src={logoutIcon} />
	// 					</Link>
	// 				</NavItem>
	// 			</Nav>
	// 		</Navbar>
	// 	</div>
	// );
};

export default Header;
