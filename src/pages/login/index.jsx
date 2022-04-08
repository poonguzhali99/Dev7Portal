import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Label, Button, Alert, Modal, ModalBody, Media } from 'reactstrap';
import { Formik, Form } from 'formik';

import './style.scss';
import FormField from '../../components/form-field';
import API_CALL from '../../services';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import Loader from '../../components/Loader';
import { logIn } from '../../services/auth/action';

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
		<div className="container-fluid login">
			<Loader show={loader} dark={true}>
				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={{ size: 10 }} lg={{ size: 5 }} xl={{ size: 5 }}>
						<Card className="mb-4 mt-5">
							<CardBody className="pl-5 pr-5 pb-5 pt-4">
								<Formik
									initialValues={
										window.location.host.search('localhost') >= 0 ? (
											{ EmailId: 'sureshmscg@gmail.com', Password: 'Kusuma@485' }
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
											url: 'LoginUser',
											data: values,
											callback: async ({ status, data }) => {
												if (status === 200 && data.emailid != null) {
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
												<h4 className="mb-0"> Welcome to Anand Foods</h4>
											</div>
											<FormGroup>
												<Label>
													<span className="text-danger">*</span> Username
												</Label>
												<FormField name="EmailId" type="text" placeholder="Username/Email" />
											</FormGroup>

											<FormGroup>
												<Label>
													<span className="text-danger">*</span> Password
												</Label>
												<FormField name="Password" type="password" placeholder="Password" />
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
												<Col sm={6} md={6} lg={6}>
													<Button color="primary" block type="submit" className="f_600">
														Login
													</Button>
												</Col>
											</Row>
										</Form>
									)}
								</Formik>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Loader>
		</div>
	);
};

export default Login;
