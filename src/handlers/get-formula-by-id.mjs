import DynamoDBTable from '../dynamodb/table.mjs';

const tableName = process.env.DYNAMODB_TABLE;

export const getFormulaByIdHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  console.info("received:", event);

  try {
    const id = event.pathParameters.id;
    const table = new DynamoDBTable(tableName);
  
    const data = await table.findById(id);
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );

    return response;
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
