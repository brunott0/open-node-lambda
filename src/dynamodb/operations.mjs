import { GetCommand, UpdateCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import Client from './client.mjs';
import {
  getItemQuery,
  updateItemQuery,
  listItemsQuery,
  searchItemsQuery
} from './queries.mjs';

const dispatch = async (Command, params) =>
  await Client.send(
    new Command(params)
  );

export const findByKeys = async (params) =>
  await dispatch(
    GetCommand,
    getItemQuery(params)
  );

export const update = async (params) =>
  await dispatch(
    UpdateCommand,
    updateItemQuery(params)
  );

export const list = async (params) =>
  await dispatch(
    ScanCommand,
    listItemsQuery(params)
  );

export const search = async (params) =>
  await dispatch(
    QueryCommand,
    searchItemsQuery(params)
  );
