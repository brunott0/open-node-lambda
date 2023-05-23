const responseParser = (result) => ({
  items: result.Items,
  lastKey: result.LastEvaluatedKey
});

export default responseParser;
