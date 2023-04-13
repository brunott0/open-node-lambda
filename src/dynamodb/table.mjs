import Client from './client.mjs';
import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

class DynamoDBTable {
  constructor(tableName) {
    this.defaultParams = {
      TableName: tableName
    };
  }

  async findById(id) {
    const params = {
      ...defaultParams,
      Key: { id },
    };

    return await Client.send(new GetCommand(params));
  }

  async update(args) {
    const params = {
      ...defaultParams,
      Item: { ...args }
    };

    return await Client.send(new PutCommand(params));
  }

  async list(args) {
    const params = {
      ...defaultParams,
      FilterExpression: 'contains(description, :keyword)',
      ExpressAttributeValues: {
        ':keyword': { S: args.searchString}
      }
    }

    return await Client.send(new ScanCommand(params));
  }
};

export default DynamoDBTable;
