import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from 'antd';
import './index.scss';

const InputComponent = ({
	inputTitle,
	inputError,
	name,
	value,
	onChange,
	isRequired,
	type,
	inputProps,
}) => {
	const inputClassNames = classNames({
		'is-error': inputError,
	});
	return (
		<div className='input-content'>
			<p className='label'>
				{inputTitle}
				{isRequired && <span className='has-text-danger'>*</span>}
			</p>
			<Input
				className={inputClassNames}
				bordered
				onChange={onChange}
				value={value}
				name={name}
				type={type}
				{...inputProps}
			/>
			{inputError && <p className='has-text-danger'>Error</p>}
		</div>
	);
};

InputComponent.propTypes = {
	inputTitle: PropTypes.string,
	inputError: PropTypes.bool,
	inputProps: PropTypes.object,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isRequired: PropTypes.bool,
};

InputComponent.defaultProps = {
	inputError: false,
	inputTitle: '',
	inputProps: {},
	isRequired: true,
	name: '',
};

export default InputComponent;
