import React from 'react';
import Input from '../../components/input';

const Content = ({ data, isClickSubmit, onChangeData }) => {
	return (
		<div>
			<div className='field'>
				<Input
					inputTitle='Name'
					type='text'
					isRequired
					inputError={isClickSubmit && data.name === ''}
					value={data.name}
					onChange={(event) =>
						onChangeData('name', event.target.value)
					}
				/>
			</div>
			<div className='field'>
				<Input
					inputTitle='Title'
					type='text'
					isRequired
					inputError={isClickSubmit && data.title === ''}
					value={data.title}
					onChange={(event) =>
						onChangeData('title', event.target.value)
					}
				/>
			</div>
		</div>
	);
};

export default Content;
