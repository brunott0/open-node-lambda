import DynamoDBTable from '../dynamodb/table.mjs';
import { validateSchema } from '../middlewares/handlers/list-formulas.middleware.mjs';

const tableName = 'FormulasTable'

export const listFormulasHandler = async (event) => {
  await validateSchema(event);

  try {
    const { total, startKey } = event.query;
    const table = new DynamoDBTable(tableName);
    const query = startKey ? { ExclusiveStartKey: startKey, Limit: total } : { Limit: total };

    const data = await table.scan(query);
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  
    console.log(response.body);

    return response;
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
