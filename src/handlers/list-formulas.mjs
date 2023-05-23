import { list, search } from '../dynamodb/operations.mjs';
import requestHandler from '../request-handler.mjs';
import validator from '../api/validation/list-formulas.validator.mjs';
import parser from '../api/parser/list-formulas.parser.mjs';

async function listFormulas(event) {
  const table = process.env.FORMULAS_TABLE;
  const params = event.queryStringParameters;
  const searchFields = ['zfab', 'redirectUrl'];
  const searchField = Object.keys(params).find(param => searchFields.includes(param));
  const filterBy = searchField ? { field: searchField, value: params[searchField] } : null;

  const data = filterBy
    ? await search({ table, ...filterBy, ...params })
    : await list({ table, ...params });

  return data;
};

export const listFormulasHandler = requestHandler(
  validator,
  parser,
  listFormulas
);
