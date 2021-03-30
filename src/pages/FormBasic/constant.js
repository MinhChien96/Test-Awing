export const DEFAULT_TEMPLATE_ID = 0;

export const defaultStateTabTwo = {
	templateId: DEFAULT_TEMPLATE_ID,
	data: [],
	isValid: false,
	isVerify: false,
};

export const templateOne = [
	{
		fieldName: 'email',
		fieldType: 'text',
		fieldValue: '',
		isRequired: true,
	},
	{
		fieldName: 'age',
		fieldType: 'number',
		fieldValue: '',
		isRequired: false,
	},
	{
		fieldName: 'gender',
		fieldType: 'boolean',
		fieldValue: '',
		isRequired: false,
	},
];

export const templateTwo = [
	{
		fieldName: 'id',
		fieldType: 'number',
		isRequired: true,
		fieldValue: '',
	},
	{
		fieldName: 'username',
		fieldType: 'text',
		isRequired: true,
		fieldValue: '',
	},
	{
		fieldName: 'password',
		fieldType: 'text',
		isRequired: false,
		fieldValue: '',
	},
];

export const listTemplate = [
	{
		templateId: 1,
		title: 'Template 1',
		fields: templateOne,
	},
	{
		templateId: 2,
		title: 'Template 2',
		fields: templateTwo,
	},
];
