import Joi from 'joi';

const body = Joi.object({
	redirectUrl: Joi.string(),
	enabled: Joi.boolean(),
});

const httpMethod = Joi.string().valid('PATCH');

const params = Joi.object({
	id: Joi.string().required(),
	createdAt: Joi.string(),
});

const validateEvent = async (event) => 
	await Promise.all([
		httpMethod.validateAsync(event.httpMethod),
		body.validateAsync(JSON.parse(event.body)),
		params.validateAsync(event.pathParameters)
	]);

export default validateEvent;
