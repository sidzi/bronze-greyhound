const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.table || "test-DynamoDBTable-da84343b"

exports.handler =  async function (event, context) {

	console.log(JSON.stringify(event));

	const item = {};
	item.uuid = uuidv4();
	item.title = event.title;
	item.task = event.task;

	var params = {
		TableName: table,
		Item: item
	};
	
	try{
		await docClient.put(params).promise();
	}catch(e){
		console.log(e);
		return {
			success: false,
			error: JSON.stringify(e)
		};
	}
	
	return {
		success: true,
		data: item
	};
};
