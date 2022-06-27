import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  index(req: Request, res: Response) {
    return response.send({ userID: req.userId });
  };

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if(userExists) {
      return response.sendStatus(409);
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    return res.json(user);
  }
};

export default new UserController();