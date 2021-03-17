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
		console.log("Put Starting");
		await docClient.put(params).promise();
		console.log("Put Done");
	}catch(e){
		console.error(e);
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
