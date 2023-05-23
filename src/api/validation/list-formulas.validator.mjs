import Joi from 'joi';

const httpMethod = Joi.string().valid('GET');

const query = Joi.object({
	total: Joi.number().required(),
	startKey: Joi.string(),
	zfab: Joi.string(),
	redirectUrl: Joi.string(),
});

const validateEvent = async (event) =>
	await Promise.all([
		httpMethod.validateAsync(event.httpMethod),
		query.validateAsync(event.queryStringParameters)
	]);

export default validateEvent;
