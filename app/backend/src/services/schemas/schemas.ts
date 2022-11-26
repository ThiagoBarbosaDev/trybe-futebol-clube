import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const placeholder = 'placeholder';

export { placeholder };
