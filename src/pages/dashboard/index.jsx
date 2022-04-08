import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
	ListGroup
} from 'reactstrap';
import { Formik } from 'formik';
import Loader from '../../components/Loader';
import Empty from '../../components/empty';
import { logOut } from '../../services/auth/action';
import Header from '../../components/header';
import DateFilter from '../../components/date-filter';
import API_CALL from '../../services';
import moment from 'moment';
import { labReport } from './sample';
import FormField from '../../components/form-field';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
	const [ loader, setLoader ] = useState(false);

	const { summaryFilter } = useSelector(({ filterReducer }) => ({
			summaryFilter: filterReducer
		})),
		dispatch = useDispatch();

	const history = useHistory();

	return (
		<div className="container-fluid container-xl dashboard">
			<Header />
			<Suspense fallback={<Spinner />}>
				<div>Welcome to new page</div>
				<Button onClick={() => history.push('/home')}>Go to home page</Button>
			</Suspense>
		</div>
	);
};

export default Dashboard;
