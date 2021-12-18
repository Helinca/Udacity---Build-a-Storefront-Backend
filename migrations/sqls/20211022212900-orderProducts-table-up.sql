CREATE TABLE orderProducts (
    order_products_id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(order_id), 
    product_id integer REFERENCES products(product_id), 
    product_quantity integer
    );