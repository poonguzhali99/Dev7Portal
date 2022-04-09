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
	const history = useHistory(),
		dispatch = useDispatch(),
		[ loginError, setloginError ] = useState(false),
		[ loader, setLoader ] = useState(false),
		[ alreadyLogin, setAlreadyLogin ] = useState(false),
		[ errorMessage, seterrorMessage ] = useState(),
		[ loginCreds, setloginCreds ] = useState(),
		[ orgLogo, setOrgLogo ] = useState('');

	return (
		<div>
			{/* <Header /> */}
			<div className="container-fluid login">
				<Row>
					{/* className="d-flex justify-content-center align-items-center"> */}
					<Col>
						<img src={bpLogin} />
					</Col>

					<Col xs={12} sm={12} md={{ size: 10 }} lg={{ size: 5 }} xl={{ size: 5 }}>
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
									<Form>
										<div className="mt-4 mb-4 text-left">
											<h4 className="mb-0"> Login</h4>
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
										<Row className="pb-4 pt-4 align-items-center">
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
									</Form>
								)}
							</Formik>
							{/* </CardBody> */}
							{/* </Card> */}
						</Loader>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Login;
