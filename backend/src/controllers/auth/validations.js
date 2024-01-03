import Joi from "joi";

const Schema = Joi.object({
  fullname: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export default Schema;
