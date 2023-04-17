const Joi = require('joi');

const schema = Joi.object({
    enabled: Joi.boolean().required(),
});

export const validateSchema = async (event) => {
    try {
        await schema.validateAsync(event);
    }
    catch (err) {
        throw err;
    }
}
