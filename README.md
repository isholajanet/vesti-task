# API DOCUMENTATION

## MODELS:
  Customer, Product, Transaction, Orders 

## Endpoints
Authentication:
  Description: Endpoint for user registration.
  Method: POST
  URL: /auth/signup
  Request Body:

    {
      "firstname": "Tayo",
      "lastname": "Tiii",
      "email": "tii@gmail.com",
      "phonenumber": "09028215030",
      "username": "tii1234",
      "password": "tiii12",
      "address": "ketu, Lagos",
      "state": "Lagos"
    }

###  Response:
    HTTP Status: 201 Created
    Body:    

        {
          "message": "User registered successfully",
          "token": "eyJhbGciOiJnCJ9..."
        }

#### Login
      Description: Endpoint for user login.
      Method: POST
      URL: /auth/login
      Request Body:

        {
          "email": "user@example.com",
          "password": "password123"
        }

### Response:
    HTTP Status: 200 OK

    Body:

      {
        "message": "User logged in successfully",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }

#### API Documentation
      Endpoints
      Authentication
      Signup
      Description: Endpoint for user registration.
      Method: POST
      URL: /auth/signup
      Request Body:

          {
            "email": "user@example.com",
            "password": "password123"
          }

#### Response:
      HTTP Status: 201 Created
      Body:

        {
          "message": "User registered successfully",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }

#### Login
        Description: Endpoint for user login.
        Method: POST
        URL: /auth/login
        Request Body:

            {
              "email": "user@example.com",
              "password": "password123"
            }

#### Response:
        HTTP Status: 200 OK
        Body:

          {
            "message": "User logged in successfully",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }

## Configuration Settings
# Environment Variables
DB_HOST: Hostname of the database server.
DB_PORT: Port number of the database server.
DB_USERNAME: Username for database access.
DB_PASSWORD: Password for database access.
DB_NAME: Name of the database.
JWT_SECRET: Secret key used for JWT token generation.
JWT_EXPIRES: Expiry time for JWT tokens.
STRIPE_SECRET_KEY: Secret key for Stripe integration.

Extending and Maintenance
# Adding New Endpoints
To add new endpoints, create a new controller class using the NestJS CLI command nest generate controller [name]. Then define your endpoint methods within the controller class, following the same structure as existing endpoints.

# Modifying Data Models
To modify data models, update the corresponding entity classes in the entities directory. Use NestJS TypeORM decorators to define attributes and relationships between entities.

# Updating Configuration Settings
To update configuration settings, modify the .env file in the root directory of the project. Ensure that new environment variables are properly documented and used within the application code.

# Handling Errors
Handle errors gracefully by using NestJS built-in exception handling mechanisms. Create custom exception filters or interceptors to handle specific error scenarios and provide informative error messages to clients.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
# vesti-task
