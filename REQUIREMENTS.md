# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products
- Index:  '/products' - GET 
- Show:    '/products/:id' - GET
- Create [token required]:  '/products/create' - POST

### Users
- Index [token required]:   '/users' - GET
- Show [token required]:    '/users/:id' - GET
- Create N[token required]: '/users/create' - POST
- Login: '/users/login' - POST

### Orders
- Show (args: user_id)[token required]:    '/orders/user/:id' - GET

## Data Shapes
### Product
- product_id
- product_name
- product_price

#### Table: products 
    (product_id:SERIAL PRIMARY KEY, 
     product_name:VARCHAR, 
     product_price:integer)

### User
- user_id
- user_name
- first_name
- last_name
- user_password

#### Table: users 
    (user_id: SERIAL PRIMARY KEY, 
     user_name VARCHAR(50),
     first_name VARCHAR(100), 
     last_name VARCHAR(100), 
     user_password VARCHAR(150))

### Order
- order_id
- user_id
- order_status (active or complete)

#### Table:: orders 
    (order_id: SERIAL PRIMARY KEY, 
    user_id: integer FOREIGN KEY REFERENCES users(user_id), 
    order_status : VARCHAR(20))

### Order_Products
- order_products_id
- order_id
- product_id 
- product_quantity

#### Table: orderProducts 
    (order_products_id: SERIAL PRIMARY KEY, 
     order_id: integer FOREIGN KEY REFERENCES orders(order_id), 
     product_id: integer FOREIGN KEY REFERENCES products(product_id), 
     product_quantity: integer)
