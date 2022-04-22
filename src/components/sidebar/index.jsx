import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { List } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { routes } from '../../../routes';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const Sidebar = () => {
	const { SubMenu } = Menu;
	const { Header, Content, Footer, Sider } = Layout;
	const history = useHistory();

	const [ collapsed, setCollapsed ] = useState(false);
	// const { userDetails, totalInstantChatUnreadCount } = useSelector(({ detailsReducer, instantChatReducer }) => {
	// 	return {
	// 		userDetails: detailsReducer.response,
	// 		totalInstantChatUnreadCount: instantChatReducer.response.totalInstantChatUnreadCount
	// 	};
	// }, shallowEqual);

	const navigation = [ 'Checklist', 'Checklist Item-1', 'Checklist Item-2', 'Checklist Item-3', 'Checklist Item-4' ];
	return (
		<Layout className="sidebar">
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: '110px',
					bottom: 0
				}}
				width={280}
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<Menu
					mode="inline"
					defaultSelectedKeys={[ '1' ]}
					defaultOpenKeys={[ 'sub1' ]}
					style={{ height: '100%' }}
				>
					{/* <SubMenu key="sub1" icon={<UserOutlined />} title="Notification Groups"> */}
					<Menu.Item key="1" onClick={() => history.push('/dashboard')}>
						Notification Groups
					</Menu.Item>
					{/* </SubMenu> */}
					<SubMenu key="sub2" icon={<LaptopOutlined />} title="Assessment">
						<Menu.Item key="5" onClick={() => history.push('/marksentry')}>
							Marks Entry
						</Menu.Item>
						<Menu.Item key="6"  onClick={() => history.push('/reportcard')}>Report Card</Menu.Item>
						<Menu.Item key="7"
						onClick={() => history.push('/marksentrystatus')} >Marks Entry Status</Menu.Item>
					
					</SubMenu>
					<SubMenu key="sub3" icon={<LaptopOutlined />} title="New Admissions">
						<Menu.Item key="8" onClick={() => history.push('/newadmissionsetup')}>
							 Admissions Setup
						</Menu.Item>
						<Menu.Item key="9"  onClick={() => history.push('/newadmissioncount')}>Admission Count</Menu.Item>
						<Menu.Item key="10"
						onClick={() => history.push('/marksentrystatus')} >Application Verification</Menu.Item>
							<Menu.Item key="11"  onClick={() => history.push('/admissionplanning')}>Admission Planning View</Menu.Item>
						<Menu.Item key="12"
						onClick={() => history.push('/consolidated')} >Consolidated Stages Report</Menu.Item>
					
					</SubMenu>
				
					
				</Menu>
			</Sider>
		</Layout>
	);
	// return (
	// 	<div className="sidebar">
	// 		<List className="nav-menu-items">
	// 			{routes.map(
	// 				(route, index) =>
	// 					navigation.indexOf(route.name) >= 0 && (
	// 						<NavLink key={index} to={route.path} activeClassName="selected">
	// 							<li className="nav-icon" title={route.name}>
	// 								<FontAwesomeIcon icon={[ 'fas', route.icon ]} />
	// 							</li>
	// 						</NavLink>
	// 					)
	// 			)}
	// 		</List>
	// 	</div>
	// );
};

export default Sidebar;
