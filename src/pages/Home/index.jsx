import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { NavLink,Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import './style.scss';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Home = () => {
	return (
		<Layout>
		 <div
            className="contain"
            style={{
                backgroundImage: `url("img/banner.png")`,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <hr />
            <div className="container" style={{ display: 'flex' }}>
                <div
                    className="row"
                    style={{
                        backgroundImage: `url("img/banner.png")`
                    }}
                >
                    <nav className="navbarmain">
                        <div className="navbar-text">
                            <div className="ulDv">
                                <ul style={{ padding: '0px' }}>
                                    <li className="navlist">
                                        <NavLink
                                            to="#"
                                            activeStyle={{
                                                color: 'red'
                                            }}
                                        >
                                            {' '}
                                            About Us{' '}
                                        </NavLink>
                                    </li>

                                    <li className="navlist">
                                        <NavLink to="#" activeStyle={{ color: 'red' }}>
                                            {' '}
                                            Privacy{' '}
                                        </NavLink>
                                    </li>

                                    <li className="navlist">
                                        <NavLink to="#" activeStyle={{ color: 'red' }}>
                                            {' '}
                                            Terms & Conditions{' '}
                                        </NavLink>
                                    </li>

                                    <li className="navlist">
                                        <NavLink to="#" activeStyle={{ color: 'red' }}>
                                            {' '}
                                            Contact Us{' '}
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/* <li>
                      <button  className={show?"closebtnstnactive":"closebtnstn"} onClick={change}>Hyderabad  </button>
                               </li>

                               <li>
                       <button className={show1?"closebtnstnactive":"closebtnstn"} onClick={change1}>Bangalore </button>
                     </li>
                   </ul> */}
                        </div>
                    </nav>
                </div>

                <div style={{ height: '100%' }}>
                    <NavLink to="#" activeStyle={{ color: 'red' }}>
                        <img
                            style={{ marginRight: '30px', marginTop: '10px' }}
                            src="https://live.ae-erp.in/Content/img/AEERPLogoNew.jpeg"
                        />
                    </NavLink>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '7%', height: '106px' }}>
                <img style={{ width: '25%' }} src="https://live.ae-erp.in/Content/img/Choseimage.png" />
            </div>
            <hr style={{ border: '1px solid red' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    marginLeft: '7%',
                    marginTop: '30px',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                }}
            >
                <div>
                    <NavLink to="#">
                        <img src="https://live.ae-erp.in/Content/img/SLESKSimage.png" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="#">
                        <img src="https://live.ae-erp.in/Content/img/SLESAKimage.png" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="./login">
                        <img src="https://live.ae-erp.in/Content/img/SLESBPImage.png" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="#">
                        <img src="https://live.ae-erp.in/Content/img/LEETMPimage.png" />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="#">
                        <img src="https://live.ae-erp.in/Content/img/WMAimage.png" />
                    </NavLink>
                </div>
            </div>
            <hr style={{ border: '1px solid red' }} />
        </div>
			</Layout>
		
	);
};
export default Home;
