import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { load } from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Toast}  from './../../utils/common-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
	PaginationListStandalone,
	PaginationProvider,
	SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import _isEmpty from 'lodash/isEmpty';

import './style.scss';

import Spinner from '../../components/spinner';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Row,
	Col,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Media,
	FormGroup,
	Label,
	ListGroup,
	CardFooter
} from 'reactstrap';
import { Formik } from 'formik';
import Loader from '../../components/Loader';
import Empty from '../../components/empty';
import { logOut } from '../../services/auth/action';
import Header from '../../components/header';
import DateFilter from '../../components/date-filter';
import API_CALL from '../../services';
import moment from 'moment';
import FormField from '../../components/form-field';
import { Link, useHistory } from 'react-router-dom';
import { getAcademicYear, setActiveAcademicYear } from '../../services/basic-details/action';
import { staticVariables } from '../../utils/constants';

const Dashboard = () => {
	const [ loader, setLoader ] = useState(false),
		[ classGroup, setClassGroup ] = useState([]),
		[ messages, setMessages ] = useState([]),
			[pageNo, setPageNo] = useState(1);

	const {
			summaryFilter,
			academicYear,
			activeAcademicYear,
			userDetails
		} = useSelector(({ filterReducer, academicYearReducer, userDetailsReducer }) => ({
			summaryFilter: filterReducer,
			academicYear: academicYearReducer.response.availableAcademicYear,
			activeAcademicYear: academicYearReducer.response.activeAcademicYear,
			userDetails: userDetailsReducer.response
		})),
		dispatch = useDispatch();
	const history = useHistory();
	let email = load('session');

	const formRef = useRef();

	useEffect(() => {
		dispatch(getAcademicYear());
	}, []);

	useEffect(
		() => {
			if (academicYear.length > 0) {
				dispatch(setActiveAcademicYear(academicYear[0].U_VALUS));
				API_CALL({
					method: 'get',
					url: `Master/GetClassGroupByid`,
					params: {
						UserMailId: email,
						AcademicYear: academicYear[0].U_VALUS,
						Branch: userDetails.Userbranch
					},
					callback: async ({ status, data }) => {
						if (status == 200) setClassGroup(data);
						else setClassGroup([]);
					}
				});
			}
		},
		[ academicYear ]
	);

	useEffect(
		() => {
			classGroup.length > 0 && formRef.current.handleSubmit();
		},
		[ classGroup ]
	);
	useEffect(()=> {
		//formRef.current.handleSubmit();
	},[pageNo])
	async function downloadFile(id, filename) {
		let fileName = `${id + filename}`;
		console.log(fileName);
		let applicationname = 'Communication';
		API_CALL({
			method: 'get',
			url: `Admincommunication/CommunicationDownloadpdf`,
			params: {
				fileName,
				applicationname
			},
			callback: async ({ status, data }) => {
				if (status == 200) {
					let pdfWindow = window.open('');
					pdfWindow.document.write(
						"<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
							encodeURI(data) +
							"'></iframe>"
					);
				}
			}
		});
		
	}
	async function deletePost(id, filename1) {
	
		console.log(filename1);
	
	
		let Id = id;
	
		let Filename = filename1;
		API_CALL({
			method: 'post',
			url: `Admincommunication/Deletecommunication`,
			params: {
				 SchoolBranchCode : userDetails.Userbranch,
		 AcadamicYear : academicYear[0].U_VALUS,
		 Classgroup : classGroup[0].U_VALUS,
		 UserMailID : email,
		Id ,
		 pagern: pageNo,
		 Filename 

			},
			callback: async ({ status, data }) => {
				if (status == 200) {
					alert("done");
					
				}
			}
		});
		
	}
	return (
		<div className="container-fluid container-xl dashboard">
			<Header />

			<h3>Notification Groups</h3>
			{classGroup.length > 0 && (
				<div>
					<Formik
						innerRef={formRef}
						initialValues={{
							AcademicYear: activeAcademicYear,
							Branch: userDetails.Userbranch,
							ClassGroup: classGroup.length > 0 ? classGroup[0].U_VALUS : ''
						}}
						onSubmit={(values) => {
							API_CALL({
								method: 'get',
								url: 'Admincommunication/GetMessagesListMobile',
								params: {
									SchoolBranchCode: values.Branch,
									AcadamicYear: values.AcademicYear,
									Classgroup: values.ClassGroup,
									UserMailID: email
									// pagern: 1
								},
								callback: async ({ status, data }) => {
									if (status == 200) setMessages(data.GetMessages);
									else setMessages([]);
								}
							});
						}}
					>
						{({ values, handleSubmit }) => (
							<Row>
								<Col>
									<FormField
										type="select"
										name="AcademicYear"
										list={academicYear}
										keyword="U_VALUS"
										label="U_Desc"
										handleOnChange={(year) => dispatch(setActiveAcademicYear(year))}
									/>
								</Col>
								<Col>
									<FormField
										type="select"
										name="Branch"
										list={staticVariables.branchList.filter(
											(branch) => branch.id === userDetails.Userbranch
										)}
										disabled={true}
										keyword="id"
										label="name"
									/>
								</Col>

								<Col>
									<FormField
										type="select"
										name="ClassGroup"
										list={classGroup}
										keyword="U_VALUS"
										label="U_Desc"
										handleOnChange={(group) => {
											console.log('group', group);
											handleSubmit();
										}}
									/>
								</Col>
							</Row>
						)}
						</Formik>
										<div>
					{messages.length > 0 ? (
						<ListGroup>
							{messages.map((mes) => {
								return (
									<Card className="mx-1 my-3">
										<CardHeader className="d-flex justify-content-between align-items-center bg-btn-primary text-white">
											<div className="text-uppercase">{mes.ReportedBycode}</div>
											<div>{mes.Classgroup}</div>
											<Button color="link" size="sm" className="bg-white" onClick={()=> {
													API_CALL({
														method: 'post',
														url: `Admincommunication/Deletecommunication`,
														data: {
															SchoolBranchCode : formRef.current.values.Branch,
													 AcadamicYear : activeAcademicYear,
													 Classgroup : formRef.current.values.ClassGroup,
													 UserMailID : email,
													Id :mes.Id.toString(),
													 pagern: pageNo,
													 Filename :mes.filename
											
														},
														callback: async ({ status, data }) => {
															if (status == 200) {
																
																Toast.add({message:"Deleted Successfully",type:'success'});
																formRef.current.handleSubmit();
																
															}
														}
													});
													
											}}>
												<FontAwesomeIcon
													icon={[ 'fas', 'trash-alt' ]}
													className="text-danger "
												/>
											</Button>
										</CardHeader>
										<CardBody>
											<div>{mes.ParentMessage}</div>
											<Link
												to="http://localhost:3000/Notification/download"
												onClick={() => downloadFile(mes.Id, mes.filename)}
												//href=""
												//target="_blank"
											>
												{mes.filename}
											</Link>
											<div>
												{mes.LinkName != '' && (
													<Link
														to={mes.LinkName}
														// onClick={() => downloadFile(mes.Id, mes.filename)}
														//href=""
														//target="_blank"
													>
														{mes.LinkName}
													</Link>
												)}
											</div>
										</CardBody>
										<CardFooter className="d-flex justify-content-end bg-btn-primary text-white">
											<div>{mes.PostedDate}</div>
										</CardFooter>
									</Card>
								);
							})}
						</ListGroup>
					) : (
						<Card className="mt-3">
							<Empty description={'No Notification found'} />
						</Card>
					)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
