import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/authenticateJWT';
import dotenv from 'dotenv';

dotenv.config();
let token = ' ';
const store = new UserStore();

// handler index return list of all users
const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// handler show return a single user by id
const show = async (req: Request, res: Response) => {
  try {
    const user: User = await store.show(req.body.user_id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// handler create return a copy of the newly created user
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_password: req.body.user_password,
    };
    const newUser: User = await store.create(user);
    if (process.env.TOKEN_SECRET) {
      token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
      res.json(token);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// handler login confirm that a user exists
const login = async (req: Request, res: Response) => {
  const user: User = {
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_password: req.body.user_password,
  };
  try {
    const u = await store.authenticate(user.user_name, user.user_password);
    if (u) {
      if (process.env.TOKEN_SECRET) {
        token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
      }
    } else {
      res.send('Username or password incorrect');
    }
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

// all handlers attached to there urls
const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/create', create);
  app.post('/users/login', login);
};

export default usersRoutes;
