# Products REST API
A Product RESTful API designed using Node.js with Express.js and MySQL, created as part of the take-home assignment for LSCS RND backend engineer application 

## Features
- Create, Read, Update, and Delete (CRUD) operations with error handling for effective product collection management.
- Offset pagination with the GET method for partial display of entries.
- Supports Dockerization for portability.
- Comes with generated HTML documentation for further guidance.

## Dependencies
| Dependency | Version |
| ---------- | ------- |
| npm        | 11.6.0  |
| mysql2     | 3.15.0  |
| joi        | 18.0.1  |
| install    | 0.13.0  |
| express    | 5.1.0   |
| dotenv     | 17.2.2  |
| nodemon    | 3.1.10  |

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://dev.mysql.com/downloads/) running locally or in the cloud  
- (Optional) [Docker](https://www.docker.com/) if you want to run in a container

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/janaquino8/lscs-backend-application-2025.git
```

### 2. Configure Environment Variables
Edit the .env file in the root folder (**DO NOT CHANGE THE DATABASE**):

### 3. Install Dependencies
```
bash
npm install
```

## Running the Program

### Running Locally
```bash
npm run dev    # for development (with nodemon)
# OR
npm start      # for production
```

### Running with Docker (optional)
```
docker build -t product-api -f docker/Dockerfile .
docker run -p 3000:3000 --env-file .env product-api
```

## File Structure
```text
.
├── controller/
│   └── controller.js
├── docs/
│   └── (files for documentation)
├── helper/
│   └── helper.js
├── routes/
│   └── routes.js
├── schema/
│   ├── schema.js
│   └── schema.sql
├── .env
├── app.js
├── connectdb.js
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## DB Schema
Refer to `schema.sql` for the complete schema
```

- id: INTEGER, AUTO_INCREMENT, PRIMARY KEY,
- name: STRING (100 chars. max), NOT NULL
- price: DECIMAL (two-decimal precision; upto 99999999.99), NOT NULL, ZERO OR POSITIVE
- description: STRING (250 chars. max), NOT NULL
- type: ENUM('luxury', 'fashion', 'electronics', 'vehicle', 'collectible', 'other'), DEFAULT = 'other',
- brand: STRING (50 chars. max),  DEFAULT = 'unknown' 
- origin_loc: STRING (75 chars. max),  DEFAULT = 'unknown'
- stock_quantity: INTEGER, ZERO OR POSITIVE, DEFAULT = 0    

```

## API Endpoints
| Method | Endpoint        | Description                                                      |
| ------ | --------------- | ---------------------------------------------------------------- |
| GET    | `/products`     | Get all products (supports pagination with `?page` and `?limit`) |
| GET    | `/products/:id` | Get a single product by ID                                       |
| POST   | `/products`     | Create a new product                                             |
| PUT    | `/products/:id` | Update a product by ID (partial update supported)                |
| DELETE | `/products/:id` | Delete a product by ID                                           |

### Examples
- GET all products | POST a new product: `http://localhost:3000/products`
- GET the 11th to 20th products: `http://localhost:3000/products?page=2&limit=10`
- With id=2, GET/PUT/DELETE product : `http://localhost:3000/products/2`

## Declaration of AI Usage
Artificial Intelligence, specifically ChatGPT, was used as a tool for logic formulation, strategizing, and documentation. Select code snippets were also generated using ChatGPT.

## Acknowledgement
The author would like to thank the La Salle Computer Society Research & Development committee for providing an opportunity to showcase technical skills through the AVP application.

## Author
**Jan Leoric B. Aquino**
