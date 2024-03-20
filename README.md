# E-Commerce API 

This is a full-fledged E-Commerce API built using Express and Mongo. It contains all the necessary functionalities of an E-commerce API, including user registration, user login, category management (add, edit, delete), product management (add, edit, delete), addition of product feature images, addition of product images, order creation, and more.

## Setup
$ git clone https://github.com/DaniNere/e_commerce_system

$ nodemon index.js


## API Endpoints

## User Routes

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /api/users/register     | Create a new user      |
| POST   | /api/users/login        | Login user             |
| GET    | /api/users              | Get all users          |
| GET    | /api/users/{id}         | Get a single user      |
| DELETE | /api/users/{id}         | Delete a user          |
| GET    | /api/users/get/count    | Get total user count   |

### * Create User

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

### * Login User

`POST | /api/users/login`

| Key        | Value          |
| ---------- | -------------- |
| email      | admin@admin.com|
| password   | password       |


## Category Routes

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | /api/categories         | Create a new category    |
| GET    | /api/categories         | Get all categories       |
| GET    | /api/categories/{id}    | Get a single category    |
| PUT    | /api/categories/{id}    | Update a category        |
| DELETE | /api/categories/{id}    | Delete a category        |


### * Create Category

`POST | /api/categories`

| Key   | Value      |
| ----- | ---------- |
| name  | Category 1 |
| icon  | icon-health|
| color | #55879     |

### * Get Categories

`GET | /api/categories`

### * Get Single Category

`GET | /api/categories/{id}`

### * Update Category

`PUT | /api/categories/{id}`

| Key   | Value      |
| ----- | ---------- |
| name  | Category 1 |
| icon  | icon-health|
| color | #55879     |

### * Delete Category

`DELETE | /api/categories/{id}`

## Product Routes

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | /api/products           | Create a new product      |
| GET    | /api/products           | Get all products          |
| GET    | /api/products/{id}      | Get a single product      |
| GET    | /api/products/get/count | Get total product count   |
| GET    | /api/products/get/featured/{count} | Get featured products count |
| POST   | /api/products/gallery-images/{id} | Upload gallery images |
| PUT    | /api/products/{id}      | Update a product          |
| DELETE | /api/products/{id}      | Delete a product          |

### * Create Product

`POST | /api/products`

| Key             | Value           |
| --------------- | --------------- |
| name            | Product 1       |
| description     | Description     |
| richDescription | Rich Description|
| image           | image           |
| brand           | Brand 1         |
| price           | 50              |
| category        | {category_id}   |
| countInStock    | 100             |
| rating          | 4.5             |
| numReviews      | 40              |
| isFeatured      | true            |

### * Get Products

`GET | /api/products`

### * Get Single Product

`GET | /api/products/{id}`

### * Get Product Counts

`GET | /api/products/get/count`

### * Get Featured Product Counts

`GET | /api/products/get/featured/{count}`

### * Upload Gallery Images

`POST | /api/products/gallery-images/{id}`

| Key    | Value            |
| ------ | ---------------- |
| images | Array of images  |

### * Update Product

`PUT | /api/products/{id}`

| Key             | Value           |
| --------------- | --------------- |
| name            | Product 1       |
| description     | Description     |
| richDescription | Rich Description|
| image           | image           |
| brand           | Brand 1         |
| price           | 50              |
| category        | {category_id}   |
| countInStock    | 100             |
| rating          | 4.5             |
| numReviews      | 40              |
| isFeatured      | true            |

### * Delete Product

`DELETE | /api/products/{id}`

## Orders Routes

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | /api/orders             | Create a new order         |
| GET    | /api/orders             | Get all orders             |
| GET    | /api/orders/{id}        | Get a single order         |
| GET    | /api/orders/get/count   | Get total order count      |
| GET    | /api/orders/get/totalsales | Get total sales           |
| GET    | /api/orders/get/usersorders/{userid} | Get user orders     |
| PUT    | /api/orders/{id}        | Update a single order      |
| DELETE | /api/orders/{id}        | Delete a single order      |

### * Create Order

`POST | /api/orders`

```json
{
	"orderItems":[
		{
			"quantity": 3,
			"product" : "602e9c348e700335d8532b14"
		},
		{
			"quantity": 2,
			"product" : "602bde0161fcc409fc149734"
		}
	],
	"shippingAddress1" : "No 45, Park Street",
	"shippingAddress2" : "No 46, Main Street",
	"city" : "Colombo",
	"zip" : "10600",
	"country" : "Sri Lanka",
	"phone" : "+94717185748",
	"user" : "602e9b718e700335d8532b13"
```

### * Get Orders

`GET |  /api/orders` 

### * Get Single Order

`GET |  /api/orders/{id}` 

### * Get Total Order Count

`GET |  /api/orders/get/count`

### * Get Total Sales

`GET |  /api/orders/get/totalsales`

### * Get User Order

`GET |  /api/orders/get/usersorders/{userid}`

### * Update Single Order

`PUT |  /api/orders/{id}` 

### * Delete Single Order

`DELETE |  /api/orders/{id}` 

## Author
   [Danielle Nere](https://github.com/DaniNere)