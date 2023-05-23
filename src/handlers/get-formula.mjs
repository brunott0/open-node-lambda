import { findByKeys } from '../dynamodb/operations.mjs';
import requestHandler from '../request-handler.mjs';
import validator from '../api/validation/get-formula.validator.mjs';
import parser from '../api/parser/get-formula.parser.mjs';

async function getFormula(event) {
  const table = process.env.FORMULAS_TABLE;
  const { id, createdAt } = event.queryStringParameters;
  const isAuthenticated = event.headers.Authorization;
  const publicFields = ['id', 'redirectUrl', 'formulas'];

  const data = await findByKeys({
    table,
    partitionKey: { name: 'id', value: id },
    sortKey: { name: 'createdAt', value: createdAt },
    projection: isAuthenticated ? null : publicFields.toString()
  });

  return data;
};

export const getFormulaHandler = requestHandler(
  validator,
  parser,
  getFormula
);
