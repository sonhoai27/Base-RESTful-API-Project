import Categories from './categories.schema';
import * as express from 'express';
import mongoose from 'mongoose';

const getCategories = async (req: any, res: express.Response) => {
  await Categories.find({}, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    // tslint:disable-next-line:no-else-after-return
    } else {
      Categories.countDocuments({}, (err, c) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.set('Pagination', `${c}|10|${req.skip}`);
        return res.json(result);
      });
    }
  }).skip(Number(req.skip)).limit(10);
};

const categoryById = (req: any, res: express.Response) => {
  return res.json(req.category);
};

const createCategory = (req: express.Request, res: express.Response) => {
  Categories.create(
    {
      ...req.body,
      createdAt: Date.now(),
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
      // tslint:disable-next-line:no-identical-functions
    },
    // tslint:disable-next-line:no-identical-functions
    (err, result) => {
      if (err) {
        return res.json(err).status(400);
      }
      return res.json(result).status(200);
    },
  );
};

const updateCategory = (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.category.name = req.body.name;
  // tslint:disable-next-line:no-object-mutation
  req.category.status = mongoose.Types.ObjectId(req.body.status);
  // tslint:disable-next-line:no-object-mutation
  req.category.updatedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.category.updatedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.category.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

const deleteCategory = (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.category.deletedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.category.deletedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.category.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

export default {
  getCategories,
  createCategory,
  categoryById,
  updateCategory,
  deleteCategory,
};
