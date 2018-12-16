import mongoose from 'mongoose';
import Joi from 'joi';
const Joigoose = require('joigoose')(mongoose, { convert: false });

export const categorySchema = Joi.object().keys({
  name: Joi.string().min(1).required(),
  status: Joi.string().required().meta({ type: 'ObjectId', ref: 'Statuses' }),
  createdAt: Joi.date().allow(null),
  createdBy: Joi.string().allow(null),
  updatedAt: Joi.date().allow(null),
  updatedBy: Joi.string().allow(null),
  deletedAt: Joi.date().allow(null),
  deletedBy: Joi.string().allow(null),
}).with('name', 'status').without(
  'name',
  [
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
    'deletedAt',
    'deletedBy',
  ],
);

const Schema = mongoose.Schema;
const mongooseCategorySchema = new Schema(Joigoose.convert(categorySchema), {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
mongooseCategorySchema.virtual('id').get(function () {
  return this._id;
});

export default mongoose.model('Categories', mongooseCategorySchema);
