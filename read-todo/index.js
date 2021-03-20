const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB({accessKeyId:'test',secretAccessKey:'test', region:'us-west-2', endpoint: 'http://25113a663c62.ngrok.io'})
const table = process.env.table || "test-DynamoDBTable-9fe736a8"


exports.handler = async function (event, context) {
  	console.log(JSON.stringify(event));
  	let data;
  	if (event.task === "all") {
  	  	data = await docClient.scan({TableName:table}).promise()
  	}else{
  		data = await docClient.get({TableName:table, Key: { id: event.id }}).promise()
	}
	return {
		success: true,
		data: data 
	};
};
