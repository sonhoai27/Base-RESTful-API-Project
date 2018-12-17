import * as express from 'express';

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

export const makeSearch = (req: any) => {
  if (req.q) {
    return {
      name: new RegExp(`${req.q}`, 'i'),
    };
  }
};

export const filterByStatus = (req: any) => {
  if (req.status) {
    return {
      status: req.status,
    };
  }
};

export const makeSort = (req: any) => {
  if (req.sort) {
    const tempSort = req.sort.split('|');
    if (tempSort[0] === 'name') {
      return {
        name: tempSort[1],
      };
    }
    return {
      createdAt: tempSort[1],
    };
  }
};
