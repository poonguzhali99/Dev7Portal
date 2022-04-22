import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { load } from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@material-ui/lab/Pagination';
import { Toast } from './../../utils/common-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import parse from 'html-react-parser';
import paginationFactory, {
	PaginationListStandalone,
	PaginationProvider,
	SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import _isEmpty from 'lodash/isEmpty';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
import { Form, Formik } from 'formik';
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
	const [loader, setLoader] = useState(false),
		[classGroup, setClassGroup] = useState([]),
		[messages, setMessages] = useState([]),
		[count, setcount] = useState('1'),
		[pageNo, setPageNo] = useState(1),
		[enteredMessage, setenteredMessage] = useState(''),
		[file, setFile] = useState("");

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
	const handleClick = (event, value) => {
		setPageNo(value);
	};
	let pageno = Math.ceil(count / 5);
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
		[academicYear]
	);

	useEffect(
		() => {
			classGroup.length > 0 && formRef.current.handleSubmit();
		},
		[classGroup, pageNo]
	);
	// useEffect(()=> {
	// 	formRef.current.handleSubmit();
	// },[pageNo])
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
					// let pdfWindow = window.open('');
					// pdfWindow.document.write(
					// 	"<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
					// 		encodeURI(data) +
					// 		"'></iframe>"
					// );

					const linkSource = `data:application/pdf;base64,${data}`;
					const downloadLink = document.createElement('a');
					document.body.appendChild(downloadLink);
					downloadLink.href = linkSource;
					downloadLink.target = '_self';
					downloadLink.download = fileName;
					downloadLink.click();
				}
			}
		});
	}
	// async function submitPost() {
	// 	API_CALL({
	// 		method: 'post',
	// 		url: `Admincommunication/Saveadmncommunication`,
	// 		data: {
	// 			SchoolBranchCode: userDetails.Userbranch,
	// 			AcadamicYear: activeAcademicYear,
	// 			Classgroup: 'All Parents',
	// 			ReportedBy: email,

	// 			pagern: pageNo,
	// 			Filename: null,
	// 			ReportedBycode: 'Admin',
	// 			Role: 'Admin',
	// 			ParentMessage: enteredMessage,
	// 			file: null,
	// 			LinkName: null
	// 		},
	// 		callback: async ({ status, data }) => {
	// 			if (status == 200) {
	// 				alert('done');
	// 			}
	// 		}
	// 	});
	// }
	return (
		<div>
		<Card className='p-2'>	<h4 >&nbsp;Notification </h4></Card>
			{classGroup.length > 0 && (
				<div className='container-fluid container-xl dashboard'>
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
								url: 'Admincommunication/GetMessagesList',
								params: {
									SchoolBranchCode: values.Branch,
									AcadamicYear: values.AcademicYear,
									Classgroup: values.ClassGroup,
									UserMailID: email,
									pagern: pageNo
								},
								callback: async ({ status, data }) => {
									if (status == 200) {
										setMessages(data.GetMessages);
										setcount(data.GetPaging.Total);
									} else setMessages([]);
								}
							});
						}}
					>
						{({ values, handleSubmit }) => (
							<Card className='p-2'>
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
								{/* <Card style={{ marginTop: '10px' }}> */}
							</Row>
							</Card>
						)}
					</Formik>
					<Formik

						initialValues={{

							file: '',
                           

						}}
						enableReinitialize={true}

						onSubmit={(values) => {
							let fileArray = values.file.split('\\'),
						filename = fileArray[fileArray.length - 1];

							console.log("fileArray", fileArray,"filename", filename );
							API_CALL({
								method: 'post',
								url: 'Admincommunication/Saveadmncommunication',
								data: {
									SchoolBranchCode: formRef.current.values.Branch,
									AcadamicYear: activeAcademicYear,
									Classgroup: formRef.current.values.ClassGroup,
									ReportedBy: email,
									pagern: pageNo,
									Filename:filename,
									ReportedBycode: userDetails.Userrole,
									Role: userDetails.Userrole,
									ParentMessage: enteredMessage,
									file: file,
									LinkName: null
								},
								callback: async ({ status, data }) => {
									if (status == 200) {
										Toast.add({
											message: 'Posted Successfully',
											type: 'success'
										});
										
										formRef.current.handleSubmit();
										window.location.reload(false);
										// setFieldValue('file', '');
										// setFile('');
										// setenteredMessage('')

									}
								}
							});

						}}
					>
						{({values, setFieldValue, handleSubmit})=> (
							<div>
							<div className="my-2">
								<CKEditor
									editor={ClassicEditor}
									className="textarea1"
									placeholder="Post a message"
									data={enteredMessage}
									onReady={(editor) => {
										// You can store the "editor" and use when it is needed.
										console.log('Editor is ready to use!', editor);
									}}
									onBlur={(event, editor) => {
										console.log('Blur.', editor);
									}}
									onFocus={(event, editor) => {
										console.log('Focus.', editor);
									}}
									onChange={(event, editor) => {
										const data = editor.getData();
										setenteredMessage(data);
									}}
									required
								/>
							</div>
							{/* </Card> */}
							{/* <FormField type="text-editor" value={enteredMessage} placeholder="Post a message" /> */}
							<FormField
								type="file"
								name="file"
								handleOnChange={(file) => {

									console.log('file', file);
									 setFile(file);
								}}
							/>
							<Button onClick={handleSubmit} color="btn-primary" className="text-white" style={{marginTop:"5px"}}>
								Submit
							</Button>
						</div>
						)}
						
					</Formik>
					<div>
					
						{messages.length > 0 ? (
							<ListGroup>
								{messages.map((mes) => {
									return (
										<Card className="mx-1 my-3">
											<CardHeader className="d-flex justify-content-between align-items-center bg-btn-primary text-white">
												<div className="text-uppercase">{mes.PostedDate}</div>
												<div>{mes.Classgroup}</div>
												<Button
													color="link"
													size="sm"
													className="bg-white"
													onClick={() => {
														API_CALL({
															method: 'post',
															url: `Admincommunication/Deletecommunication`,
															data: {
																SchoolBranchCode: formRef.current.values.Branch,
																AcadamicYear: activeAcademicYear,
																Classgroup: formRef.current.values.ClassGroup,
																UserMailID: email,
																Id: mes.Id.toString(),
																pagern: pageNo,
																Filename: mes.filename
															},
															callback: async ({ status, data }) => {
																if (status == 200) {
																	Toast.add({
																		message: 'Deleted Successfully',
																		type: 'success'
																	});
																	formRef.current.handleSubmit();
																}
															}
														});
													}}
												>
													<FontAwesomeIcon
														icon={['fas', 'trash-alt']}
														className="text-danger "
													/>
												</Button>
											</CardHeader>
											<CardBody>
												<div>{parse(mes.ParentMessage)}</div>
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
											<CardFooter className="d-flex justify-content-end bg-muted text-black footer">
												<div>{mes.ReportedBycode}</div>
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
					<Card className="mt-3">
						<Pagination color="primary" size="large" count={pageno} value={pageNo} onChange={handleClick} />
						{/* <p>Total:{count}</p>  */}
					</Card>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
