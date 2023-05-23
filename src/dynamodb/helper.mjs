export function buildUpdateExpressions(attributes) { 
  const initialValue = {
    UpdateExpression: 'SET '
  };

  const reducer = (prev, currentAttrKey, index) => {
    const valueRef = `:val${index}`;
    const updateExpr = `${currentAttrKey} = ${valueRef}`;
    const last = index === Object.keys(attributes).length - 1

    return {
      UpdateExpression: last
        ? prev.UpdateExpression + updateExpr
        : prev.UpdateExpression + updateExpr + ',',
      ExpressionAttributeValues: {
        ...prev.ExpressionAttributeValues,
        [valueRef]: attributes[currentAttrKey]
      }
    }
  }

  return Object.keys(attributes).reduce(reducer, initialValue);
}

/* 
    E.g. buildUpdateExpressions
    Input value:
      {
        enabled: true,
        redirectUrl: 'www.redirectUrl.com',
        updatedAt: 1683322360845
      }
    Expected result:
      {
        ExpressionAttributeValues: {
            ":val0": true,
            ":val1": "www.redirectUrl.com.br",
            ":val2": 1683322360845
        },
        UpdateExpression: "set enabled = :val0, redirectUrl = :val1, updatedAt = :val2"
      }
*/