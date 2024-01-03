import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  photos: Joi.string(),
  quantity:Joi.number(),
});

export default ProductSchema;
