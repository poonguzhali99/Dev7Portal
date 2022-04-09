import React from 'react';
import { Field } from 'formik';
import { Input, InputGroup, InputGroupText, CustomInput } from 'reactstrap';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import './style.scss';

const generateComponent = (data) => {
	let {
		type,
		maxLength,
		disabled,
		list,
		keyword,
		label,
		disable,
		placeholder,
		autoFocus,
		form: { touched, errors },
		form,
		field: { name },
		field,
		onChange,
		value,
		addOn,
		handleOnBlur,
		handleOnChange,
		hideDefaultOption,
		getCursorIndex
	} = data;
	onChange
		? (field = {
				...field,
				onChange
			})
		: null;
	value
		? (field = {
				...field,
				value
			})
		: null;

	// In need to highlight the error for the input box, add the below code in <Input />
	// className = { touched && error ? 'input-error' : '' }
	if (type === 'select') {
		let findObjectLabel;
		for (let objKey in list[0]) {
			if (list[0].hasOwnProperty(objKey)) {
				if (objKey == label) findObjectLabel = objKey;
			}
		}
		// list.sort((a, b) => {
		// 	var labelA, labelB;
		// 	if (findObjectLabel) {
		// 		for (let val in a) {
		// 			if (val == label) {
		// 				labelA = a[label] && a[label].toLowerCase();
		// 				labelB = b[label] && b[label].toLowerCase();
		// 				if (labelA < labelB) return -1;
		// 			}
		// 		}
		// 	} else {
		// 		labelA = a.toLowerCase();
		// 		labelB = b.toLowerCase();
		// 		if (labelA < labelB) return -1;
		// 	}
		// });
		let optionList = list.map((data, index) => {
			return (
				<option key={index} value={keyword ? data[keyword] : data}>
					{label ? data[label] : data}
				</option>
			);
		});
		let error = errors[name] && touched[name];
		return (
			<div>
				<InputGroup>
					<Input
						type="select"
						id={name}
						disabled={disabled}
						{...field}
						className={`${errors[name] && touched[name] ? 'input-error' : ''} ${_isEmpty(field.value)
							? 'font-weight-normal placeholder-color'
							: ''}`}
						onChange={async ({ target: { value } }) => {
							await form.setFieldValue(field.name, value);
							handleOnChange && handleOnChange(value);
						}}
					>
						{!hideDefaultOption && <option value="">Select {placeholder}</option>}
						{optionList}
					</Input>
					{addOn && (
						<InputGroupAddon addonType="append">
							<InputGroupText className={`${errors[name] && touched[name] ? 'input-error' : ''}`}>
								{addOn}
							</InputGroupText>
						</InputGroupAddon>
					)}
				</InputGroup>
				<div className={`customError ${error ? 'inValid' : ''}`}>{error && errors[name]}</div>
			</div>
		);
	} else {
		let error = errors[name] && touched[name];
		let pointerIndex = document.getElementById(name);
		if (pointerIndex && getCursorIndex) {
			getCursorIndex(pointerIndex.selectionStart);
		}
		return (
			<div>
				<InputGroup>
					<Input
						id={name}
						// autoComplete="off"
						autoCorrect="off"
						autoComplete="new-password"
						type={type}
						placeholder={placeholder}
						disabled={disabled}
						maxLength={maxLength ? maxLength : ''}
						className={`form-control ${errors[name] && touched[name] ? 'input-error' : ''} ${addOn
							? 'withAddon'
							: ''}`}
						{...field}
						autoFocus={autoFocus}
						onChange={async ({ target: { value } }) => {
							await form.setFieldValue(field.name, value);
							handleOnChange && handleOnChange(value);
						}}
						onBlur={async ({ target: { value } }) => {
							await form.setFieldTouched(name, true);
							handleOnBlur && handleOnBlur(value);
						}}
					/>
					{addOn && (
						<InputGroupAddon addonType="append">
							<InputGroupText className={`${errors[name] && touched[name] ? 'input-error' : ''}`}>
								{addOn}
							</InputGroupText>
						</InputGroupAddon>
					)}
				</InputGroup>
				{/* {errors[name] && touched[name] ? (
					<div className="error mt-1 animated fadeInDown">
						<span className="message">{errors[name]}</span>
					</div>
				) : (
					''
				)} */}
				<div className={`customError ${error ? 'inValid' : ''}`}>{error && errors[name]}</div>
			</div>
		);
	}
};

const FormField = (props) => <Field {...props} component={generateComponent} />;

export default FormField;
