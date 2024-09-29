const { Joi } = require('express-validation')
const updateUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  }),
}

module.exports = {
  updateUserValidation,
}
