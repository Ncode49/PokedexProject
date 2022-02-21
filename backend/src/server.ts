import { Request, Response } from 'express';
import express from 'express';

export class Server {
  readonly port: number;
  constructor(port: number) {
    this.port = port;
  }

  start() {
    const app = express();
    app.get('/', function (req: Request, res: Response) {
      res.send('salut les gens');
    });
    app.listen(this.port, function () {
      console.log('serveur a démarré');
    });
  }
}
