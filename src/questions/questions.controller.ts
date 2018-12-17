import { filterByStatus, makeSearch, makeSort } from './../utils/route';
import Questions from './questions.schema';
import * as express from 'express';
import mongoose from 'mongoose';

const getQuestions = async (req: any, res: express.Response) => {
  await Questions.find({
    ...makeSearch(req),
    ...filterByCategory(req),
    ...filterByStatus(req),
  // tslint:disable-next-line:align
  }, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    // tslint:disable-next-line:no-else-after-return
    } else {
      Questions.countDocuments({
        ...makeSearch(req),
        ...filterByCategory(req),
        ...filterByStatus(req),
      // tslint:disable-next-line:align
      }, (err, c) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.set('Pagination', `${c}|10|${req.skip}`);
        return res.json(result);
      });
    }
  }).skip(Number(req.skip)).limit(Number(req.limit)).sort({
    ...makeSort(req),
  });
};

const questionById = (req: any, res: express.Response) => {
  return res.json(req.question);
};

const createQuestion = (req: express.Request, res: express.Response) => {
  Questions.create(
    {
      ...req.body,
      createdAt: Date.now(),
      createdBy: 'sonH',
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

const updateQuestion = (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.question.name = req.body.name;
  // tslint:disable-next-line:no-object-mutation
  req.question.status = mongoose.Types.ObjectId(req.body.status);
  // tslint:disable-next-line:no-object-mutation
  req.question.category = mongoose.Types.ObjectId(req.body.category);
  // tslint:disable-next-line:no-object-mutation
  req.question.updatedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.question.updatedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.question.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

const deleteQuestion = (req: any, res: express.Response) => {
  // tslint:disable-next-line:no-object-mutation
  req.question.deletedAt = new Date();
  // tslint:disable-next-line:no-object-mutation
  req.question.deletedBy = 'Son Hoai';
  // tslint:disable-next-line:no-identical-functions
  req.question.save((err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    return res.json(result);
  });
};

const filterByCategory = (req: any) => {
  if (req.category) {
    return {
      category: req.category,
    };
  }
};

export default {
  getQuestions,
  createQuestion,
  questionById,
  updateQuestion,
  deleteQuestion,
};
