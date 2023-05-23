import { buildUpdateExpressions } from './helper.mjs';

const baseQuery = ({ table, ...params }) => ({
  TableName: table,
  ...params
});

const indexQuery = ({ index, ...params }) => baseQuery({
  IndexName: index,
  ...params
})

const queryByPK = ({ partitionKey, sortKey, ...params }) => {
  if (sortKey) return baseQuery({
    Key: {
      [partitionKey.name]: partitionKey.value,
      [sortKey.name]: sortKey.value
    },
    ...params
  });

  return baseQuery({
    Key: {
      [partitionKey.name]: partitionKey.value,
    },
    ...params
  });
};

export function getItemQuery (params) {
  if (params.projection) return queryByPK({
    ProjectionExpression: projection,
    ...params
  });

  return queryByPK(params);
}

export function updateItemQuery ({ attributes, ...params }) {
  const expressions = buildUpdateExpressions(
    { ...attributes, updatedAt: Date.now() }
  );

  return queryByPK({
    ...expressions,
    ...params
  })
}

export function listItemsQuery ({ startKey, total, ...params }) {
  if (startKey) return baseQuery({
    Limit: total,
    ExclusiveStartKey: startKey,
    ...params
  });

  return baseQuery({
    Limit: total,
    ...params
  });
};

export function searchItemsQuery ({
  field,
  value,
  startKey,
  total,
  ...params
}) {
  const index = `${field}-index`;
  const expressions = {
    KeyConditionExpression: `${field} = :value`,
    ExpressionAttributeValues: { ':value': value }
  };

  if (startKey) return indexQuery({
    index,
    Limit: total,
    ExclusiveStartKey: startKey,
    ...expressions,
    ...params
  });

  return indexQuery({
    index,
    Limit: total,
    ...expressions,
    ...params
  });
}