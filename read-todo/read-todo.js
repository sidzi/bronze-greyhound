const table = process.env.TABLE_NAME || "TableForTODOS";

exports.readTODO = (dynamoDBClient, event) => {
if (event.task === "all") {
  	  	data =  dynamoDBClient.scan({TableName:table}).promise();
  	  	//  TODO if total todos greater than 1 mb will have to paginate aombine etc..
  	} else {
  		data =  dynamoDBClient.getItem({TableName:table, Key: { "uuid": {"S": event.task }}}).promise();
	}
	return data;
}