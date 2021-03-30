import React, { useState } from 'react';
import classNames from 'classnames';
import { Tabs, Select } from 'antd';
import Input from '../../components/input';
import {
	listTemplate,
	defaultStateTabTwo,
	DEFAULT_TEMPLATE_ID,
} from './constant';

const { TabPane } = Tabs;

const { Option } = Select;

const Template = ({ onChange, templateSelected, isShowError }) => {
	const selectClassNames = classNames({
		'is-error': isShowError,
	});
	return (
		<div className='is-flex center-vertical'>
			<div className='pd-right-10'>Template</div>
			<Select
				defaultValue={0}
				style={{ width: 200 }}
				onChange={onChange}
				value={templateSelected}
				className={selectClassNames}
			>
				<Option value={0}>None</Option>

				{listTemplate.map((template) => (
					<Option
						key={template.templateId}
						value={template.templateId}
					>
						{template.title}
					</Option>
				))}
			</Select>
			{isShowError && (
				<span className='pd-left-10 has-text-danger'>Error</span>
			)}
		</div>
	);
};

const ContentTab = ({
	dataView,
	onChangeTemplate,
	isClickSubmit,
	onChangeData,
}) => {
	return (
		<div>
			<Template
				templateSelected={dataView.templateId}
				onChange={onChangeTemplate}
				isShowError={
					(dataView.isVerify ||
						(isClickSubmit && dataView.isVerify)) &&
					dataView.templateId === DEFAULT_TEMPLATE_ID
				}
			/>
			<div>
				{dataView.data.map((view, index) => {
					const isShowError =
						(dataView.isVerify ||
							(isClickSubmit && dataView.isVerify)) &&
						view.fieldValue === '' &&
						view.isRequired;
					return (
						<div className='field' key={index}>
							<Input
								inputTitle={view.fieldName}
								type={view.fieldType}
								isRequired={view.isRequired}
								inputError={isShowError}
								value={view.fieldValue}
								onChange={(event) =>
									onChangeData(index, event.target.value)
								}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Content = ({ listView, onChangeData, checkValidData, isClickSubmit }) => {
	const [activeView, setActiveView] = useState('0');

	const handleChangeView = (key) => {
		setActiveView(key);
	};

	const onEdit = (targetKey, action) => {
		let newState = [...listView].map((view) => ({
			...view,
			isVerify: true,
		}));
		if (action == 'add' && checkValidData()) {
			newState.push({ ...defaultStateTabTwo });
			setActiveView(`${newState.length - 1}`);
		}
		onChangeData(newState);
	};

	const handleChangeTemplate = (indexView, templateId) => {
		const newState = [...listView];
		newState[indexView].templateId = templateId;
		newState[indexView].isVerify = false;
		if (templateId == DEFAULT_TEMPLATE_ID) newState[indexView].data = [];
		else
			newState[indexView].data = listTemplate.find(
				(template) => template.templateId === templateId
			).fields;
		onChangeData(newState);
	};

	const handleChangeData = (indexView, indexField, value) => {
		const newData = listView.map((dataView, index) => {
			if (index === indexView) {
				const newDataField = [...dataView.data];
				newDataField[indexField] = { ...newDataField[indexField] };
				newDataField[indexField].fieldValue = value;
				const isValid = newDataField.every(
					(field) =>
						(field.isRequired && field.fieldValue !== '') ||
						!field.isRequired
				);
				return { ...dataView, data: newDataField, isValid };
			}
			return dataView;
		});

		onChangeData(newData);
	};

	return (
		<div>
			<Tabs
				type='editable-card'
				onChange={handleChangeView}
				activeKey={activeView}
				onEdit={onEdit}
			>
				{listView.map((view, index) => (
					<TabPane key={index} closable={false} tab={`View ${index}`}>
						<ContentTab
							dataView={view}
							onChangeTemplate={(templateId) =>
								handleChangeTemplate(index, templateId)
							}
							isClickSubmit={isClickSubmit}
							onChangeData={(indexField, value) =>
								handleChangeData(index, indexField, value)
							}
						/>
					</TabPane>
				))}
			</Tabs>
		</div>
	);
};

export default Content;
