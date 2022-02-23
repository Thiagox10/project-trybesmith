const schemaUser = Joi.object({
  username: Joi.string().min(2).required().messages({
    'any.required': 'Username is required',
    'string.min': 'Username must be longer than 2 characters',
    'string.base': 'Username must be a string',
  }),
  classe: Joi.string().min(2).required().messages({
    'any.required': 'Classe is required',
    'string.min': 'Classe must be longer than 2 characters',
    'string.base': 'Classe must be a string',
  }),
  level: Joi.number().min(0).required().messages({
    'any.required': 'Level is required',
    'number.min': 'Level must be greater than 0',
    'number.base': 'Level must be a number',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be longer than 7 characters',
    'string.base': 'Password must be a string',
  }),
});