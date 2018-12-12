import * as express from 'express';

declare var __DEV__: boolean;

export class Server {
  readonly app: express.Express;
  readonly port: number;

  constructor() {
    this.app = express();
    this.port = this.getPort();
    this.setRoutes();
    this.start();
  }

  readonly start = (): void => {
    this.app.listen(this.port, this.onListen);
  }

  readonly onListen = (err: any): void => {
    if (err) {
      console.error(err);
      return;
    }
    if (__DEV__) {
      console.log('> in development');
    }

    console.log(`> listening on port ${this.port}`);
  }

  readonly getPort = (): number => parseInt(process.env.PORT, 10) || 3000;

  readonly setRoutes = (): void => {
    this.app.get('/', this.getHomepage);
  }

  private async getHomepage(
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> {
    console.log(req);
    try {
      const thing = await Promise.resolve({ one: 'two' });
      return res.json({ ...thing, hello: 'world' });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}

export default new Server().app;
