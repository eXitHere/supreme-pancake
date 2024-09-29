const { Joi } = require('express-validation')
const createCourseValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    detail: Joi.string().required(),
  }),
}

module.exports = {
  createCourseValidation,
}
