import * as express from 'express';
import bodyParser from 'body-parser';

import { dbConnect } from './configs/db';
import statuses from './statuses/statuses.routes';
import categories from './categories/categories.routes';
import questions from './questions/questions.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (
    // tslint:disable-next-line
    _req: express.Request,
    res:express.Response,
    next:express.NextFunction,
  ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

dbConnect();

const getPort = (): number => parseInt(process.env.PORT, 10) || 3000;

app.use('/api/statuses', statuses);
app.use('/api/categories', categories);
app.use('/api/questions', questions);

app.listen(getPort(), () => {
  console.log(`Server started with port: http://localhost:${getPort()}`);
});

export default app;
