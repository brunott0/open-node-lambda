import DynamoDBTable from '../dynamodb/table.mjs';

const tableName = process.env.DYNAMODB_TABLE;

export const putItemHandler = async (event) => {
	if (event.httpMethod !== 'POST') {
			throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
	}

  try {
		const body = JSON.parse(event.body);
    const table = new DynamoDBTable(tableName);
  
    const data = await table.update(body);
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );

    return response;
  } catch(err) {

  }
};
