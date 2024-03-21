# E-Commerce API 

This is a full-fledged E-Commerce API built using Express and Mongo. It contains all the necessary functionalities of an E-commerce API, including user registration, user login, category management (add, edit, delete), product management (add, edit, delete), addition of product feature images, addition of product images, order creation, and more.

## 🛠️ Built With

|                            JavaScript                               |                            Node.js                               |                           Express                                |                              Git                                 |                            GitHub                                |                             MongoDB                              |                               NPM                                |                             Swagger                               |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg"/> | <img height="50" width="50" src="https://cdn.worldvectorlogo.com/logos/swagger.svg"/> |





## 🔧 Authentication

This API uses a `Bearer Token` authentication system.

The token is obtained through the `POST /api/users/login` EndPoint.

If the user and their credentials are valid, this route returns an object containing the validation token that will be required in all routes of this API, except for user registration and login, and category listing.
</b>
## 🚀 Setup
<br>
These instructions will allow you to get a copy of the project running on your local machine for development, testing, and contribution purposes.

1 - Open the terminal in the folder where you want to save the project.
2 - Clone this repository

$ git clone https://github.com/DaniNere/e_commerce_system

3 - Navigate to the project directory
```
cd e_commerce
```
4 - Create your environment variables file (.env)
$ nodemon index.js

5 - Start the application server using the command:

```
npm start
```
6 - Swagger was implemented in the project to facilitate testing, and can be accessed via the route in your own browser.

````
http://localhost:3000/api-docs
````

## 🔧 API Endpoints

### User Routes:

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | /api/users              | Get all users          |
| GET    | /api/users/{id}         | Get a single user      |
| POST   | /api/users/register     | Create a new user      |
| GET    | /api/users/count        | Get total user count   |
| PUT    | /api/users/update       | Update a user          |
| DELETE | /api/users/{id}         | Delete a user          |
| POST   | /api/users/login        | Login user             |
| GET    | /api/users/perfil       | Get authenticated user profile |

#### Get Users
`GET | /api/users`

#### Get Single User
`GET | /api/users/{id}`

#### Create User
`POST | /api/users/register`

**Request:**
```
{
  "name": "Novo Usuário",
  "email": "novo_usuario@example.com",
  "password": "senha123",
  "phone": "+5511987654321",
  "isAdmin": false,
  "street": "Rua Nova, 123",
  "apartment": "Apto 101",
  "zip": "12345-678",
  "city": "São Paulo",
  "country": "Brazil"
}
```
**Response:**

```
{
  "message": "User created successfully",
  "user": {
    "_id": "6063fdd7ea3eb6366c097c3c",
    "name": "Novo Usuário",
    "email": "novo_usuario@example.com",
    "phone": "+5511987654321",
    "isAdmin": false,
    "street": "Rua Nova, 123",
    "apartment": "Apto 101",
    "zip": "12345-678",
    "city": "São Paulo",
    "country": "Brazil",
    "createdAt": "2023-03-31T18:29:27.530Z",
    "updatedAt": "2023-03-31T18:29:27.530Z",
    "__v": 0
  }

}
```
#### Get Total User Count
`GET | /api/users/get/count`

#### Update User
`PUT | /api/users/update`

``
**Request:**
```
{
  "name": "Novo Nome",
  "email": "novo_email@example.com",
  "password": "nova_senha123",
  "phone": "+5511987654321",
  "isAdmin": true,
  "street": "Nova Rua, 456",
  "apartment": "Apto 202",
  "zip": "54321-876",
  "city": "Rio de Janeiro",
  "country": "Brazil"
}
```
**Response:**

```
{
  "success": true,
  "user": {
    "_id": "6063fdd7ea3eb6366c097c3c",
    "name": "Novo Nome",
    "email": "novo_email@example.com",
    "phone": "+5511987654321",
    "isAdmin": true,
    "street": "Nova Rua, 456",
    "apartment": "Apto 202",
    "zip": "54321-876",
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "createdAt": "2023-03-31T18:29:27.530Z",
    "updatedAt": "2023-03-31T18:29:27.530Z",
    "__v": 0
  }
}
```
#### Delete User
`DELETE | /api/users/{id}`

#### Login User
`POST | /api/users/login`

**Request:**
```
{
  "email": "novo_usuario@example.com",
  "password": "senha123"
}
```
**Response:**
```
{
  "user": "novo_usuario@example.com",
  "token": "<jwt_token>"
}
```
#### Login User
`POST | /api/users/login`

| Key        | Value          |
| ---------- | -------------- |
| email      | admin@admin.com|
| password   | password       |

#### Create User

`POST | /api/users/register`

| Key        | Value          |
| ---------- | -------------- |
| name       | Admin          |
| email      | admin@admin.com|
| password   | password       |
| phone      | +947187520     |
| isAdmin    | true           |
| street     | Main Street    |
| apartment  | Block C        |
| zip        | 10870          |
| city       | Colombo        |
| country    | Sri Lanka      |


### Category Routes

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | /api/categories         | Create a new category    |
| GET    | /api/categories         | Get all categories       |
| GET    | /api/categories/{id}    | Get a single category    |
| PUT    | /api/categories/{id}    | Update a category        |
| DELETE | /api/categories/{id}    | Delete a category        |

#### Get Categories

`GET | /api/categories`

#### Get Single Category

`GET | /api/categories/{id}`

**Request:**
```
{
  "id": "category_id"
}
````
**Response:**
```
{
  "_id": "category_id",
  "name": "Category Name",
  "icon": "category_icon",
  "color": "#ffffff",
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
#### Create Category

`POST | /api/categories`

**Request:**
{
  "name": "New Category",
  "icon": "new_category_icon",
  "color": "#ff0000"
}
**Response:**
````
{
  "_id": "new_category_id",
  "name": "New Category",
  "icon": "new_category_icon",
  "color": "#ff0000",
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
#### Update Category
`PUT | /api/categories/{id}`

**Request:**

````
{
  "name": "Updated Category Name",
  "icon": "updated_category_icon",
  "color": "#0000ff"
}
````
**Response:**
````
{
  "_id": "updated_category_id",
  "name": "Updated Category Name",
  "icon": "updated_category_icon",
  "color": "#0000ff",
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
### Delete Category
`DELETE | /api/categories/{id}`
**Request:**
````
{
  "id": "category_id"
}
````
**Response:**
````
{
  "success": true,
  "message": "Category deleted successfully"
}
`````
## Product Routes

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | /api/products               | Get all products            |
| GET    | /api/products/{id}          | Get a single product        |
| POST   | /api/products               | Create a new product        |
| PUT    | /api/products/{id}          | Update a product            |
| DELETE | /api/products/{id}          | Delete a product            |
| GET    | /api/products/get/count    | Get total product count     |
| GET    | /api/products/get/featured | Get featured products       |

#### Get Products

`GET | /api/products`

#### Get Single Product

`GET | /api/products/{id}`

**Request:**
```
{
  "id": "product_id"
}
````
**Response:**
```
{
  "_id": "product_id",
  "name": "Product Name",
  "description": "Product Description",
  ...
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
#### Create Product
`POST | /api/products`

**Request:**
```
{
  "name": "New Product",
  "description": "New Product Description",
  ...
}
````
**Response:**
```
{
  "_id": "new_product_id",
  "name": "New Product",
  "description": "New Product Description",
  ...
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````

#### Update Product
`PUT | /api/products/{id}`

**Request:**
```
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  ...
}
````
**Response:**
````
{
  "_id": "updated_product_id",
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  ...
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
#### Delete Product
`DELETE | /api/products/{id}`

**Request:**
````
{
  "id": "product_id"
}
````
**Response:**
````
{
  "success": true,
  "message": "Product deleted successfully"
}
````
#### Total Product Count
GET | /api/products/get/count

**Response:**
````
{
  "success": true,
  "productCount": 10
}
````
#### Featured Products
`GET | /api/products/get/featured`

**Response:**
````
{
  "success": true,
  "products": [
    {
      "_id": "product_id_1",
      "name": "Featured Product 1",
      ...
    },
    {
      "_id": "product_id_2",
      "name": "Featured Product 2",
      ...
    },
    ...
  ]
}
````
## Order Routes

| Method | Endpoint                             | Description                               |
| ------ | ------------------------------------ | ----------------------------------------- |
| GET    | /api/orders                          | Get all orders                            |
| GET    | /api/orders/{id}                     | Get details of a single order             |
| POST   | /api/orders                          | Create a new order                        |
| DELETE | /api/orders/{id}                     | Delete an order and associated items      |
| GET    | /api/orders/count                    | Get total count of orders                 |
| GET    | /api/orders/totalsales               | Get total sales                           |
| GET    | /api/orders/usersorders/{userid}     | Get orders of a specific user             |

#### * Get Orders

`GET | /api/orders`

#### * Get Single Order

`GET | /api/orders/{id}`

**Request:**
```
{
  "id": "order_id"
}
````
**Response:**
````
{
  "_id": "order_id",
  "orderItems": [
    {
      "_id": "order_item_id",
      "quantity": 2,
      "product": {
        "_id": "product_id",
        "name": "Product Name",
        ...
      }
    },
    ...
  ],
  "shippingAddress1": "Address 1",
  "shippingAddress2": "Address 2",
  ...
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````
#### * Create Order
`POST | /api/orders`

**Request:**
````
{
  "orderItems": [
    {
      "quantity": 2,
      "product": "product_id"
    },
    ...
  ],
  "shippingAddress1": "Address 1",
  "shippingAddress2": "Address 2",
  ...
}
````
**Response:**

````
{
  "_id": "new_order_id",
  "orderItems": [
    {
      "_id": "order_item_id",
      "quantity": 2,
      "product": {
        "_id": "product_id",
        "name": "Product Name",
        ...
      }
    },
    ...
  ],
  "shippingAddress1": "Address 1",
  "shippingAddress2": "Address 2",
  ...
  "createdAt": "2024-03-21T12:00:00.000Z",
  "updatedAt": "2024-03-21T12:00:00.000Z"
}
````

#### * Delete Order
`DELETE | /api/orders/{id}`

**Request:**

```
{
  "id": "order_id"
}
````
**Response:**
````
{
  "success": true,
  "message": "Order and associated items deleted successfully"
}
* Get Total Order Count
`GET | /api/orders/count`
````

**Response:**
{
  "orderCount": 10
}
```
#### * Get Total Sales
`GET | /api/orders/totalsales`
````
**Response:**
```
{
  "totalSales": 1500
}
```
#### * Get User Orders
`GET | /api/orders/usersorders/{userid}`

**Request:**
````
{
  "userid": "user_id"
}
````
**Response**
````
[
  {
    "_id": "order_id_1",
    "orderItems": [
      {
        "_id": "order_item_id_1",
        "quantity": 2,
        "product": {
          "_id": "product_id_1",
          "name": "Product Name 1",
        }
      },
      ],
    "shippingAddress1": "Address 1",
    "shippingAddress2": "Address 2",
    "createdAt": "2024-03-21T12:00:00.000Z",
    "updatedAt": "2024-03-21T12:00:00.000Z"
  },
]
````
## Author
   [Danielle Nere](https://github.com/DaniNere)
   
## Contributing
This repository was created for study purposes, so please contribute to it.
If I helped you in any way, I'll be happy to know. And if you know someone who identifies with the content, be sure to share.

If possible:

⭐️ Star the project

🐛 Find and report issues


