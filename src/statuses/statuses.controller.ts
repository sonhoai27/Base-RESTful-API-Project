import Statuses from './statuses.schema';
import * as express from 'express';

const getStatuses = (req: any, res: express.Response) => {
  Statuses.find({}, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    // tslint:disable-next-line:no-else-after-return
    } else {
      Statuses.count({}, (err, c) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.set('Pagination', `${c}|10|${req.skip}`);
        return res.json(result);
      });
    }
  }).skip(Number(req.skip)).limit(10);
};

const statusById = (req: any, res: express.Response) => {
  return res.json(req.status);
};

const createStatus = (req: express.Request, res: express.Response) => {
  Statuses.create(
    {
      ...req.body,
      createdAt: Date.now(),
      createdBy: 'sonH',
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
    },
    // tslint:disable-next-line:no-identical-functions
    (err, result) => {
      if (err) {
        return res.status(403).json(err);
      }
      return res.json(result);
    },
  );
};
const updateStatus =  async (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.status.name = req.body.name;
  // tslint:disable-next-line:no-object-mutation
  req.status.updatedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.status.updatedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.status.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

const deleteStatus = (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.status.deletedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.status.deletedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.status.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

export default {
  getStatuses,
  createStatus,
  statusById,
  updateStatus,
  deleteStatus,
};
