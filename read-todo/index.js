const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.table || "test-DynamoDBTable-da84343b"


exports.handler = async function (event, context) {
  	console.log(JSON.stringify(event));
  	if (event.task === "all") {
  	  	await docClient.scan({TableName:table}).promise()
  	}else{
  		await docClient.get({TableName:table, Key: { id: event.id }}).promise()
	}
	return "Read todo";
};
