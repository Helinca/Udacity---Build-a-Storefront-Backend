import express, { Request, Response } from 'express';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Storefront_backend home page!');
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
