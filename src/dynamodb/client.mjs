import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: 'sa-east-1',
  endpoint: 'http://host.docker.internal:8000'
});

export default DynamoDBDocumentClient.from(client);
