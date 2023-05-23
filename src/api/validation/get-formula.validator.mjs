import Joi from 'joi';

const httpMethod = Joi.string().valid('GET');

const query = Joi.object({
	id: Joi.string().required(),
	createdAt: Joi.string(),
});

const validateEvent = async (event) =>
	await Promise.all([
		httpMethod.validateAsync(event.httpMethod),
		query.validateAsync(event.queryStringParameters)
	]);

export default validateEvent;