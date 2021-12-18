CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id integer  NOT NULL,
    order_status VARCHAR(20) NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);
