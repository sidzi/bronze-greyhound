const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB({accessKeyId:'test',secretAccessKey:'test', region:'us-west-2', endpoint: 'http://25113a663c62.ngrok.io'})
const table = "test-DynamoDBTable-9fe736a8"

exports.handler =  async function (event, context) {

	console.log(JSON.stringify(event));
	const item = {
		uuid: {
			"S":  uuidv4().toString()
		},
		title:{
			"S": event.title || "Untitled"
		},
		task: {
			"S": event.task || "Task description goes here ...."
		}
	};

	var params = {
		TableName: table,
		Item: item
	};
	
	try{
		await docClient.putItem(params).promise();
	}catch(e){
		console.log(e);
		return {
			success: false,
			meta: {
				params
			},
			error: JSON.stringify(e)
		};
	}

	return {
		success: true,
		data: item
	};
};