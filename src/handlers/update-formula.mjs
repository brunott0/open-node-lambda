import { update } from '../dynamodb/operations.mjs';
import requestHandler from '../request-handler.mjs';
import validator from '../api/validation/update-formula.validator.mjs';
import parser from '../api/parser/update-formula.parser.mjs';

async function updateFormula(event) {
  const table = process.env.FORMULAS_TABLE;
  const body = JSON.parse(event.body);
  const { id, createdAt } = event.pathParameters;
  
  const data = await update({
    table,
    partitionKey: { name: 'id', value: id },
    sortKey: { name: 'createdAt', value: createdAt},
    attributes: body
  });

  return data;
};

export const updateFormulaHandler = requestHandler(
  validator,
  parser,
  updateFormula
);
