import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Label, Button, Alert, Modal, ModalBody, Media } from 'reactstrap';
import { Formik, Form } from 'formik';

import './style.scss';
import FormField from '../../components/form-field';
import API_CALL from '../../services';
import { Link, useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import Loader from '../../components/Loader';
import { logIn } from '../../services/auth/action';
import bpLogin from '../../assets/images/bp-login.png';
import Header from '../../components/header';
import { save } from 'react-cookies';

const Login = () => {
	let pathName = window.location.pathname;
	console.log("login",pathName);
	const history = useHistory(),
		dispatch = useDispatch(),
		[ loginError, setloginError ] = useState(false),
		[ loader, setLoader ] = useState(false),
		[ alreadyLogin, setAlreadyLogin ] = useState(false),
		[ errorMessage, seterrorMessage ] = useState(),
		[ loginCreds, setloginCreds ] = useState(),
		[logo, setLogo]=useState("https://dev7.ae-erp.in/img/bplog.png"),
		[ orgLogo, setOrgLogo ] = useState('');
		useEffect(()=> {
		
			if (pathName == '/SLESBP') {
			   setLogo("https://dev2.ae-erp.in/Content/img/SLESBPLOGO.png");
			}
		}, [pathName])
	return (
		<div>
			{/* <Header /> */}
			<div className="container-fluid login">
				<Row className='login-row'>
					{/* className="d-flex justify-content-center align-items-center"> */}
					<Col className='login-col'>
						<img col-12 col-sm-12 col-md-10 col-lg-5 col-xl-5 src={bpLogin} style={{width:"83%"}} />
					</Col>

					<Col xs={12} sm={12} md={{ size: 9 }} lg={{ size: 4 }} xl={{ size: 5 }}>
						<Loader show={loader} dark={true}>
							{/* <Col> */}
							{/* <Card className=""> */}
							{/* <CardBody className="pl-5 pr-5 pb-5 pt-4"> */}
							<Formik
								initialValues={
									window.location.host.search('localhost') >= 0 ? (
										{ EmailId: 'admin.bp@sas.com', Password: 'Ae$12345' }
									) : (
										{ EmailId: '', Password: '' }
									)
								}
								validate={(values) => {
									let errors = {};
									if (!values.EmailId) errors.EmailId = 'Required';
									if (!values.Password) errors.Password = 'Required';
									else if (values.Password.length > 40)
										errors.Password = 'Password should not be more than 40 Charecters';
									return errors;
								}}
								onSubmit={(values) => {
									setloginError(false);
									setLoader(true);
									API_CALL({
										method: 'post',
										url: 'Login/LoginUser',
										data: values,
										callback: async ({ status, data }) => {
											if (status === 200 && data.Userrole == 'Admin') {
												save('session', values.EmailId, { secure: true });
												save('userdetails', data);
												setLoader(false);
												dispatch(logIn(data));
											} else {
												setLoader(false);
												setloginError(true);
											}
										}
									});
								}}
							>
								{() => (
									<Form style={{marginTop:"-26px"}}>
										<div className="mt-4 mb-3 text-left">
											<h4 className="mb-0"><strong>Login</strong> </h4>
										</div>
										<FormGroup>
											<Label>
												<span className="text-danger">*</span> Email Id
											</Label>
											<FormField name="EmailId" type="text" placeholder="Enter Email" />
										</FormGroup>

										<FormGroup>
											<Label>
												<span className="text-danger">*</span> Password
											</Label>
											<FormField name="Password" type="password" placeholder="Enter Password" />
											<Alert
												color="danger"
												isOpen={loginError}
												toggle={() => setloginError(!loginError)}
												className="mt-4"
											>
												Invalid Email/Password
											</Alert>
										</FormGroup>
										<Row className="pb-0 pt-2 align-items-center">
											<Col>
												<div className="text-left pt-2 pb-2">
													<Link to="">Forgot Password</Link>
												</div>
											</Col>
											<Col sm={6} md={6} lg={6}>
												<Button color="primary" block type="submit" className="f_600">
													Login
												</Button>
											</Col>
										</Row>
										<Row className="pb-0 pt-2 align-items-center">
										<Col>
											<p><input type="checkbox" checked="checked" /> &nbsp;I have read and accept the Terms & Conditions and Privacy Policy of AE ERP Portal.</p>
										</Col>
									</Row>
									<Row className="pb-0 pt-4 align-items-center">
										<Col>
										<img  src="https://dev7.ae-erp.in/img/ksadmin.png" style={{width:"96%"}} />
										</Col>
									</Row>
									</Form>
								)}
							</Formik>
							{/* </CardBody> */}
							{/* </Card> */}
						</Loader>
					</Col>
				</Row >
				<Row style={{justifyContent:"center",marginLeft:"150px",marginTop:"20px"}}>Copyright © 2020 AE Enterprises. All rights reserved.</Row>
			</div>
		</div>
	);
};

export default Login;
