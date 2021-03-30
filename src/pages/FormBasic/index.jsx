import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import { defaultStateTabTwo } from './constant';

import './index.scss';

const { TabPane } = Tabs;

const FormBasic = () => {
	const [activeTab, setActiveTab] = useState('2');
	const [isClickSubmit, setIsClickSubmit] = useState(false);
	const [dataTabOne, setDataTabOne] = useState({ name: '', title: '' });
	const [dataTabTwo, setDataTabTwo] = useState([{ ...defaultStateTabTwo }]);

	const handleChangeTab = (key) => {
		setActiveTab(key);
	};

	const handleChangeDataTabOne = (key, value) => {
		setDataTabOne((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleChangeDataTabTwo = (newState) => {
		setDataTabTwo(newState);
	};

	const checkValidDataTabOne = () => {
		return dataTabOne.name !== '' && dataTabOne.title !== '';
	};

	const checkValidDataTabTwo = () => {
		return dataTabTwo.every((view) => view.isValid);
	};

	const handleSubmit = () => {
		setIsClickSubmit(true);
		const newStateTabTwo = dataTabTwo.map((view) => ({
			...view,
			isVerify: true,
		}));
		setDataTabTwo(newStateTabTwo);

		const isValidTabOne = checkValidDataTabOne();
		const isValidTabTwo = checkValidDataTabTwo();
		if (isValidTabOne && isValidTabTwo) {
			Modal.success({
				content: 'Thành công',
			});
		} else {
			Modal.error({
				title: 'Error',
				content: 'Vui lòng điền đủ thông tin',
			});
		}
	};

	return (
		<div className='form-basic'>
			<div className='content'>
				<Tabs
					defaultActiveKey='1'
					activeKey={activeTab}
					onChange={handleChangeTab}
				>
					<TabPane tab='Tab 1' key='1'>
						<TabOne
							data={dataTabOne}
							isClickSubmit={isClickSubmit}
							onChangeData={handleChangeDataTabOne}
						/>
					</TabPane>
					<TabPane tab='Tab 2' key='2'>
						<TabTwo
							listView={dataTabTwo}
							isClickSubmit={isClickSubmit}
							checkValidData={checkValidDataTabTwo}
							onChangeData={handleChangeDataTabTwo}
						/>
					</TabPane>
				</Tabs>
			</div>
			<Button type='primary' onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	);
};

export default FormBasic;
