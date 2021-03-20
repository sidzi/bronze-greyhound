const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB({accessKeyId:'test',secretAccessKey:'test', region:'us-west-2', endpoint: 'http://25113a663c62.ngrok.io'})

const {createTODO} = require('./create-todo');

exports.handler =  async function (event, context) {
	console.log(JSON.stringify(event));
	const data  = await createTODO(docClient, event);
	return {
		success: true,
		data: data
	}
};