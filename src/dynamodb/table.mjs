import Client from './client.mjs';
import { GetCommand, PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

class DynamoDBTable {
  constructor(tableName) {
    this.dispatch = async (Command, params) => await Client.send(
      new Command({
        TableName: tableName,
        ...params
      })
    );
  }

  findById = async (id) => await this.dispatch(
    GetCommand,
    { Key: { id } }
  );

  update = async (args) => await this.dispatch(
    PutCommand,
    { Item: { ...args } }
  );

  list = async (args) => await this.dispatch(
    ScanCommand,
    args
  );

  // searchByTerm = async (args) => await this.dispatch(
  //   ScanCommand,
  //   {
  //     FilterExpression: 'contains(description, :keyword)',
  //     ExpressAttributeValues: {
  //       ':keyword': { S: args.searchString}
  //     }
  //   }
  // );
};

export default DynamoDBTable;
