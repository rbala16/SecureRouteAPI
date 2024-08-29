[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green.svg)](https://www.mongodb.com/)
[![ExpressJS](https://img.shields.io/badge/ExpressJS-4.x-orange.svg)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-14.x-green.svg)](https://nodejs.org/)

# SecureRouteApi

[![License: MIT](https://img.shields.io/badge/License-MIT-lightblue.svg)](https://opensource.org/licenses/MIT)

## Jewellery Shop

## Overview 
This project is a jewellery shop backend application built with Express.js and MongoDB. It includes functionalities for user authentication, managing customer records, and handling various jewellery-related data:

## Features

- User Authentication: Secure endpoints using JWT for token-based authentication.
- Customer Management: CRUD operations for managing customer data, including the ability to create, read, update, and delete customer records.
- Location Data: Store and manage location information as part of customer records

## Technology Stack
- Backend Framework: Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Utility: UUID for generating unique IDs

## Instructions
💻   
### Prerequisites
- Node.js 
- MongoDB 
- Postman (for testing endpoints)

### Setup
1. Clone the Repository
2. Install Dependencies:
```
npm install
```
3.Create Token for Authentication:<br>
Run the following command at the terminal:
```
cd jwt 
node token_gen.js
```
go to Postman and send Get request to :http://localhost:8080/generate-token <br>
Grab that token and save it for later use
`Note`:Token is valid for only 1 hour

3. Run the Application:<br>
Run the following command at the terminal:
```
`npm run dev` or <br>
`npm start` <br>
```

5. Access the API: Open your Postman and go to: http://localhost:8080

## Authentication
* Token Generation:

* Users must authenticate via JWT. Tokens should be included in the Authorization header of requests.
```
Authorization: Bearer <your_jwt_token>
```
## Testing
- Use Postman to test the API endpoints.
1 Ensure that you include authentication tokens where required.

## API Endpoints
### Customer Routes

* Create Customer:

`POST /customers`
Request Body: { "name": "Robert", "age:23,"location": "Toronto }
Headers: Authorization: Bearer <token>

* Get all customers:

`GET /customers`
Headers: Authorization: Bearer <token>

* Get Customer by name ,age,location ,custId:

`GET /customers?custId=<value>`
`GET /customers?name=<value>`
`GET /customers?name=<value>&age=<value>&location=<value>`
`GET /customers?name=<value>&age=<value>`
Headers: Authorization: Bearer <token>

`GET /customers`
Headers: Authorization: Bearer <token>

* Get Customer by ID:

`GET /customers/:id`
Headers: Authorization: Bearer <token>

* Update Customer:

`PATCH /customers/:id`
Request Body: { "name": "Robert", "age:24,"location": "Niagara falls" }
Headers: Authorization: Bearer <token>

* Delete Customer:

`DELETE /customers/:id`
Headers: Authorization: Bearer <token>

## Authors Notes:
This README and accompanying repo have been brought to you by: Rajni bala

