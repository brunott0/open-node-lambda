import Joi from 'joi';

const httpMethod = Joi.string().valid('GET');

const query = Joi.object({
    total: Joi.number(),
    startKey: Joi.string(),
});

export const validateSchema = async (event) => {
    try {
        await Promise.all([
            httpMethod.validateAsync(event.httpMethod),
            query.validateAsync(JSON.parse(event.query))
        ]);
    }
    catch (err) {
        throw err;
    }
}
