import mongoose from 'mongoose';
import Joi from 'joi';
const Joigoose = require('joigoose')(mongoose, { convert: false });

export const statusSchema = Joi.object().keys({
  name: Joi.string().min(1).required(),
  createdAt: Joi.date().allow(null),
  createdBy: Joi.string().allow(null),
  updatedAt: Joi.date().allow(null),
  updatedBy: Joi.string().allow(null),
  deletedAt: Joi.date().allow(null),
  deletedBy: Joi.string().allow(null),
})
.without(
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
const mongooseStatusSchema = new Schema(Joigoose.convert(statusSchema), {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
mongooseStatusSchema.virtual('id').get(function () {
  return this._id;
});

export default mongoose.model('Statuses', mongooseStatusSchema);
