import Joi from 'joi';

const body = Joi.object({
    redirectUrl: Joi.string(),
    enabled: Joi.boolean(),
});

const httpMethod = Joi.string().valid('PATCH');

const params = Joi.object({
    id: Joi.string().required(),
});

export const validateSchema = async (event) => {
    try {
        await Promise.all([
            httpMethod.validateAsync(event.httpMethod),
            body.validateAsync(JSON.parse(event.body)),
            params.validateAsync(JSON.parse(event.params))
        ]);
    }
    catch (err) {
        throw err;
    }
}
