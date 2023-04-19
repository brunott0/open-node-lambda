// import DynamoDBTable from '../dynamodb/table.mjs';
import { validateSchema } from '../middlewares/handlers/list-formulas.middleware.mjs';

// const tableName = process.env.DYNAMODB_TABLE;

export const getFormulaHandler = async (event) => {
  await validateSchema(event);

  try {
    // const searchString = event.pathParameters.search;
    // const table = new DynamoDBTable(tableName);
  
    const data = {}; // await table.list({ searchString });
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );

    return data;
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
