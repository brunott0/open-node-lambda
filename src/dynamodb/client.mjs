import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const host = process.env.DB_HOST

const client = new DynamoDBClient({
  region: 'sa-east-1',
  endpoint: "http://host.docker.internal:8000"
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export default ddbDocClient;
