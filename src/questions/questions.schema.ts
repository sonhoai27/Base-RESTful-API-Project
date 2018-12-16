import mongoose from 'mongoose';
import Joi from 'joi';
const Joigoose = require('joigoose')(mongoose, { convert: false });

export const questionSchema = Joi.object().keys({
  name: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  status: Joi.string().required().meta({ type: 'ObjectId', ref: 'Statuses' }),
  category: Joi.string().required().meta({ type: 'ObjectId', ref: 'Categories' }),
  createdAt: Joi.date().allow(null),
  createdBy: Joi.string().allow(null),
  updatedAt: Joi.date().allow(null),
  updatedBy: Joi.string().allow(null),
  deletedAt: Joi.date().allow(null),
  deletedBy: Joi.string().allow(null),
}).with('name', ['content', 'status', 'category']).without(
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
const mongooseQuestionSchema = new Schema(Joigoose.convert(questionSchema), {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
mongooseQuestionSchema.virtual('id').get(function () {
  return this._id;
});
export default mongoose.model('Questions', mongooseQuestionSchema);
