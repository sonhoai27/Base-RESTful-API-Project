import Joi from 'joi';
import * as express from 'express';
import Questions, { questionSchema } from './questions.schema';
import mongoose from 'mongoose';

export const filter = (
  req: any,
  // tslint:disable-next-line:variable-name
  _res: express.Response,
  next: express.NextFunction,
  ) => {
  // tslint:disable-next-line
  req.status = req.query.status ? req.query.status : undefined;
  // tslint:disable-next-line
  req.category = req.query.category ? req.query.category : undefined;
  // tslint:disable-next-line
  req.q = req.query.q ? req.query.q : undefined;
  // tslint:disable-next-line
  req.sort = req.query.sort ? req.query.sort : 'name|-1';
  next();
};
export const pagination = (
  req: any,
  // tslint:disable-next-line:variable-name
  _res: express.Response,
  next: express.NextFunction,
  ) => {
  // tslint:disable-next-line:no-object-mutation
  req.skip = req.query.page ? req.query.page : 0;
  // tslint:disable-next-line:no-object-mutation
  req.limit = req.query.limit ? req.query.limit : 10;
  next();
};

export const add = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body } = req;
  const valid = Joi.validate(body, questionSchema);
  if (valid.error === null) {
    next();
  }else if (valid.error !== null && body.name) {
      // tslint:disable-next-line:no-object-mutation
    req.body = { ...{}, ...{
      name: body.name,
      status: mongoose.Types.ObjectId(body.status),
      category: mongoose.Types.ObjectId(body.category),
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
    Questions.findById(id, (err: any, result: any) => {
      if (!err) {
        // tslint:disable-next-line:no-object-mutation
        req.question = result;
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
