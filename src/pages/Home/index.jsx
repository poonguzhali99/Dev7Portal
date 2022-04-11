import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { NavLink,Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const Home = () => {
	return (
		<Layout>
		 <div
            className="contain"
            style={{
                backgroundImage: `url("https://dev7.ae-erp.in/img/banner.png")`,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
          
            <div className="container" style={{ display: 'flex' }}>
                <div
                    className="row"
                    style={{
                        backgroundImage: `url("https://dev7.ae-erp.in/img/banner.png")`
                    }}
                >
                  
                </div>

             
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '7%', height: '106px' ,marginTop:"20px",marginBottom:"20px"}}>
                <img style={{ width: '25%' }} src="https://live.ae-erp.in/Content/img/Choseimage.png" />
            </div>
            <hr style={{ border: '2px solid red' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    marginLeft: '7%',
                    marginTop: '60px',
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
