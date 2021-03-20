const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB({accessKeyId:'test',secretAccessKey:'test', region:'us-west-2', endpoint: 'http://localhost:4566'})
const table = process.env.table || "test-DynamoDBTable-9fe736a8"


exports.handler = async function (event, context) {
  	console.log(JSON.stringify(event));
  	console.log(JSON.stringify(JSON.stringify(docClient)));
  	if (event.task === "all") {
  	  	await docClient.scan({TableName:table}).promise()
  	}else{
  		await docClient.get({TableName:table, Key: { id: event.id }}).promise()
	}
	return "Read todo";
};
