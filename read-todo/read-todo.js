const table = process.env.TABLE_NAME || "TableForTODOS";

exports.readTODO = (dynamoDBClient, event) => {
if (event.task === "all") {
  	  	data =  dynamoDBClient.scan({TableName:table}).promise();
  	} else {
  		data =  dynamoDBClient.get({TableName:table, Key: { id: event.id }}).promise();
	}
	return data;
}