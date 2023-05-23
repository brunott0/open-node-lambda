const formatResponse = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

const requestHandler = (
  requestValidator,
  responseParser,
  handlerFunction
) => async (event) => {
  try {
    await requestValidator(event);

    const result = await handlerFunction(event);
    const response = formatResponse(
      responseParser(result)
    );

    return response;
  } catch(error) {

    return formatResponse(500, { Error: error });
  }
}

export default requestHandler;
