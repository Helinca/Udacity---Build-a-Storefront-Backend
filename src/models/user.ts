import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  user_id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  user_password: string;
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT user_name, first_name, last_name FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      if (saltRounds) {
        const hash = bcrypt.hashSync(
          u.user_password + process.env.BCRYPT_PASSWORD,
          parseInt(saltRounds)
        );
        const conn = await Client.connect();
        const sql =
          'INSERT INTO users (user_name, first_name, last_name, user_password) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await conn.query(sql, [
          u.user_name,
          u.first_name,
          u.last_name,
          hash,
        ]);
        const user = result.rows[0];
        conn.release();
        return user;
      } else {
        throw new Error('Can not find env.SALT_ROUNDS');
      }
    } catch (err) {
      throw new Error(
        `Unable create user (${u.first_name} ${u.last_name}): ${err}`
      );
    }
  }

  async authenticate(
    user_name: string,
    user_password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT user_password FROM users WHERE user_name=($1)';
    const result = await conn.query(sql, [user_name]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          user_password + process.env.BCRYPT_PASSWORD,
          user.user_password
        )
      ) {
        return user;
      } else {
        throw new Error('Wrong password, please try again.');
      }
    }
    conn.release();
    return null;
  }
  //show specific users by user_id
  async show(id: number): Promise<User> {
    try {
      const sql =
        'SELECT user_name, first_name, last_name FROM users WHERE user_id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }
}
