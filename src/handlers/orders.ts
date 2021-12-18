import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.show(req.body.user_id);
    res.json(order);
  } catch (err) {
    console.log(`${err}`);
    res.status(401);
    res.json(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders/:id', show);
};

export default ordersRoutes;
