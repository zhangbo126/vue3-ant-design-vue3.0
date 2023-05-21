export const tableColumns = [
	{
		title: "序号",
		dataIndex: "no",
		width: 45,
		align: "center",
	},
	{
		title: "名称",
		dataIndex: "template",
		width: 100,
		align: "center",
	},

	{
		title: "描述",
		dataIndex: "describe",
		align: "center",

	},
	{
		title: "其他",
		dataIndex: "other",
		align: "center",
		width: 160,
	},
];

export const tableData = [
	{
		no: 1,
		template: 'z-table组件',
		describe: '基于a-table二次封装的组件默认自带分页 change和showSizeChange方法统一改为onPagination方法',
		other:'其他方法和api的使用和a-table保持一致'
	},
	{
		no: 2,
		template: 'z-upload组件',
		describe: '基于a-upload和a-image二次封装的组件,自带图片预览功能以及图片上传校验功能和图片默认回显功能',
		other:'其他方法和api的使用和a-upload保持一致'
	},
	{
		no: 3,
		template: 'z-text-tooltip组件',
		describe: '基于a-tooltip二次封装的组件,支持单行和多行文本内容超出hover提示',
		other:'其他方法和api的使用和a-tooltip保持一致'
	},
	{
		no: 4,
		template: 'v-auth权限按钮指令',
		describe: '根据当前账号权限控制按钮显隐',
		other:`使用方法:v-auth="['Btn_Delete_Account']"`
	},
]