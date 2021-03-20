const { v4: uuidv4 } = require('uuid');
const table = process.env.TABLE_NAME || "TableForTODOS";

exports.createTODO = async (dynamoDBClient, event) => {
	const uniqueID = uuidv4().toString(); 
	const item = {
		uuid: {
			"S":  uniqueID
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
	
	await dynamoDBClient.putItem(params).promise()
	return uniqueID;
}