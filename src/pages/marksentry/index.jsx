import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { load } from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@material-ui/lab/Pagination';
import Tableviewmarks from './Tableviewmarks';
import { Toast } from './../../utils/common-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import parse from 'html-react-parser';
import paginationFactory, {
	PaginationListStandalone,
	PaginationProvider,
	SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import _isEmpty from 'lodash/isEmpty';
import swal from 'sweetalert2';


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

const Marksentry = () => {

	const [loader, setLoader] = useState(false),
		[classGroup, setClassGroup] = useState([]),
		[messages, setMessages] = useState([]),
		
	
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

		const [assesmentClass, setAssesmentClass] = useState([]);
		const [assesmentSection, setAssesmentSection] = useState([]);
		const [periods,setPeriods]=useState([]);
		const [area,setarea]=useState([]);
		const [assessmentSubjects,setAssesmentSubjects]=useState([]);
		const [assessmentArea,setAssesmentArea]=useState([]);
		const [assessmentType,setAssessmentType]=useState([]);
		const [ startindex, setstartindex ] = useState(1);
		const [ endindex, setendindex ] = useState(9);
		const [ count, setcount ] = useState('1');
		const [ enteredrow, setchangerow ] = useState('9');
		const [pageNo, setPageNo] = useState(1);
		let pageno = Math.ceil(count / 9);

		

	const history = useHistory();
	let email = load('session');

	const formRef = useRef();

	

	const handleChange = (event, value) => {
        setPageNo(value);
        setendindex(pageNo * 9);
        setstartindex(pageNo * 9 - 9);
    };

	 
	useEffect(() => {
		dispatch(getAcademicYear());
	}, []);

	useEffect(() => {
		if (academicYear.length > 0)  {
			dispatch(setActiveAcademicYear(academicYear[0].U_VALUS))
		}
	
	}, [academicYear]);

	useEffect(()=> {
		activeAcademicYear && API_CALL({
			method: 'get',
			url: 'Assessment/GetAssessmentClass',
			params: {
				UserMailId: email,
				AcademicYear: activeAcademicYear,
				Branch: userDetails.Userbranch
			},
			callback: async ({ status, data }) => {
				if (status == 200) setAssesmentClass(data)
				else setAssesmentClass([])
			}
		});
	}, [activeAcademicYear])

	return (
		<div className="container-fluid container-xl dashboard">
			<Card >	<h4 >&nbsp;Marks Entry </h4></Card>
			<div>
				{academicYear.length > 0 &&(<Card style={{ padding: "18px" }}>


					<Formik
						initialValues={{
							AcademicYear: academicYear[0].U_VALUS,
							Branch: userDetails.Userbranch,
							AssesmentClass: '',
							Section:'',
							Periods:'',
							AssesmentArea:'',
							AssesmentSubject:''
						}}
						onSubmit={(values) => {
							if(values.AssesmentClass===""){
                                swal.fire({
                                    text: 'Please select the Class',
                    
                                    button: 'Okay'
                                });
                            }
						else	if(values.Section===""){
                                swal.fire({
                                    text: 'Please select the section',
                    
                                    button: 'Okay'
                                });
                            }
							else	if(values.Periods===""){
                                swal.fire({
                                    text: 'Please select the cycle',
                    
                                    button: 'Okay'
                                });
                            }
						else{	API_CALL({
								method: 'get',
								url: 'Assessment/GetAssessment',
								params: {
									
									UserMailId: email,
									
									AcademicYear: values.AcademicYear,
									Branch: values.Branch,
									AssessClass: values.AssesmentClass,
									Section: values.Section,
                                    Period:values.Periods,
									Subject:values.AssesmentSubject,
									catg:values.AssesmentType

									

								},
								callback: async ({ status, data }) => {
									if (status == 200) {
										setMessages(data.ARows);
										let output = Object.keys(data.ARows).length;
        
                                         setcount(output);
										
									} else setMessages([]);
								}
							});
						}}
					}
					>
						{({values, handleSubmit, setFieldValue})=>
						(<div>
						<Row style={{
							marginBottom: "10px"
						}}>
							<Col>
							<FormField
								type="select"
								name="AcademicYear"
								placeholder="Academic Year"
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
								name="AssesmentClass"

								placeholder="Class"

								list={assesmentClass}
								keyword="U_VALUS"
								label="U_Desc"
								handleOnChange={(id) =>{
									API_CALL({
										method: 'get',
										url: 'Assessment/GetAssessmentSection',
										params: {
											UserMailId: email,
											AcademicYear: activeAcademicYear,
											Branch: userDetails.Userbranch,
											AssessClass:id
										},
										callback: async ({ status, data }) => {
											if (status == 200) setAssesmentSection(data)
											else setAssesmentSection([])
										}
									});
									API_CALL({
										method: 'get',
										url: 'Assessment/GetAssessmentPeriods',
										params: {
											UserMailId: email,
											AcademicYear: activeAcademicYear,
											Branch: userDetails.Userbranch,
											AssessClass:id
										},
										callback: async ({ status, data }) => {
											if (status == 200) setPeriods(data)
											else setPeriods([])
										}
									});
								}}
							/>
							</Col>
							<Col>
							<FormField
								type="select"
								name="Section"
								placeholder="Section"
								list={assesmentSection}
								keyword="U_VALUS"
								label="U_Desc"
								handleOnChange={(id) =>{
									// handleSubmit11(id);
								}}
							/>
							</Col>
							<Col>
							<FormField
								type="select"
								name="Periods"
								placeholder="Assessment Cycle"
								list={periods}
								keyword="U_VALUS"
								label="U_Desc"
								handleOnChange={(id) =>{
									console.log("id period", id);
									API_CALL({
										method: 'get',
										url: 'Assessment/GetAssessmentPeriodSubjects',
										params: {
											UserMailId: email,
											AcademicYear: activeAcademicYear,
											Branch: userDetails.Userbranch,
											AssessClass:values.AssesmentClass,
											Section:values.Section,
											Period:id
										},
										callback: async ({ status, data }) => {
											console.log("status, data",status, data);
											if (status == 200) 
											{
												console.log("data", data);
												setarea(data)
										
												setAssesmentArea( [ ...new Set(data.map(({ StudFee }) => StudFee)) ])
											}
											else setarea([])
										}
									});
								}}
							/>
							</Col>
							</Row>
							<Row>
						
							
							<Col>
							<FormField
								type="select"

								name="AssesmentArea"
								placeholder="Assessment Area"
								list={assessmentArea}
								
								handleOnChange={(assesarea) =>{
									console.log("assesarea", assesarea);
									let tempArray = area.filter((res) => res.StudFee ==assesarea);
									console.log('Area Selected', tempArray);
									setAssesmentSubjects(tempArray);
								}}
							/>
							</Col>
							<Col>
							<FormField
								type="select"

								name="AssesmentSubject"
								placeholder="Assessment Subject"
								list={assessmentSubjects}
								 keyword="U_VALUS"
								 label="U_Desc"
								handleOnChange={(subject) =>{
									console.log("subject", subject);
									API_CALL({
										method: 'get',
										url: 'Assessment/GetAssessmentPeriodTestCategories',
										params: {
											UserMailId: email,
											AcademicYear: activeAcademicYear,
											Branch: userDetails.Userbranch,
											AssessClass:values.AssesmentClass,
											Section:values.Section,
											Period:values.Periods,
											Subject:subject
										},
										callback: async ({ status, data }) => {
											console.log("status, data",status, data);
											if (status == 200) 
											{
												console.log("data", data);
												setAssessmentType(data)
										
												
											}
											else setarea([])
										}
									});
								}}
								
							/>
							</Col>
							<Col>
							<FormField
								type="select"

								name="AssesmentType"
								placeholder="Assessment Type"
								list={assessmentType}
								 keyword="U_VALUS"
								 label="U_Desc"
								handleOnChange={(subject) =>{
									console.log("subject", subject);
								}}
							/>
							</Col>
							<Col className='d-flex justify-content-center align-items-center'>
								<Button color="btn-primary" size='sm' className="text-white" onClick={handleSubmit}>Search</Button>
								
								<Button color="btn-primary" size='sm' className="text-white mx-2">Refresh</Button>
							</Col>
						</Row>
						</div>)}
					</Formik>









				</Card>)}
				<div>


					{messages.length > 0 ? (

						<Card className="mt-3"> <Tableviewmarks data={messages} data22={startindex} data33={endindex}  /></Card>

					) : (
						<Card className="mt-3">
							<Empty description={'No data found'} />
						</Card>
					)}
				</div>
				<Card className="mt-3">
					<Pagination color="primary" size="large" count={pageno} value={pageNo}  onChange={handleChange} />
					{/* <p>Total:{count}</p>  */}
				</Card>
			</div>

		</div>
	);
};

export default Marksentry;
