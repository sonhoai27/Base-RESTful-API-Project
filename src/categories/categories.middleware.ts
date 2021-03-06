import Joi from 'joi';
import * as express from 'express';
import Categories, { categorySchema } from './categories.schema';
import mongoose from 'mongoose';

export const add = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body } = req;
  const valid = Joi.validate(body, categorySchema);
  if (valid.error === null) {
    next();
  }else if (valid.error !== null && body.name) {
      // tslint:disable-next-line:no-object-mutation
    req.body = { ...{}, ...{
      name: body.name,
      status: mongoose.Types.ObjectId(body.status),
    } };
    next();
  } else {
    return res
    .status(403)
    .json({
      message: valid.error,
    });
  }
};

export const detailById = (
  req: any,
  res: express.Response,
  next: express.NextFunction,
  id: any,
) => {
  if (id) {
    Categories.findById(id, (err: any, result: any) => {
      if (!err) {
        // tslint:disable-next-line:no-object-mutation
        req.category = result;
        next();
      }else {
        return res
        .status(500)
        .json({
          message: `Not found id: ${id}`,
        });
      }
    });
  } else {
    return res.status(400).json({ message: `Not found id: ${id}` });
  }
};
