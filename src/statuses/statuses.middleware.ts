import Joi from 'joi';
import * as express from 'express';
import Statuses, { statusSchema } from './statuses.schema';
export const pagination = (
  req: any,
  // tslint:disable-next-line:variable-name
  _res: express.Response,
  next: express.NextFunction,
  ) => {
  // tslint:disable-next-line:no-object-mutation
  req.skip = req.query.page ? req.query.page : 0;
  next();
};

export const add = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body } = req;
  const valid = Joi.validate(body, statusSchema);
  if (valid.error === null) {
    next();
  }else if (valid.error !== null && body.name) {
      // tslint:disable-next-line:no-object-mutation
    req.body = { ...{}, ...{ name: body.name } };
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
    Statuses.findById(id, (err: any, result: any) => {
      if (!err) {
        // tslint:disable-next-line:no-object-mutation
        req.status = result;
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
