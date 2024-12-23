# GraphQL API

A GraphQL API that interacts with Axie Infinity GraphQL, Axie Infinity Smart Contract, MongoDB, and User Authentication

## Features
- Axie Infinity Smart Contract Interaction using Infura
- Fetch data from Axie GraphQL
- User Authentication
- MongoDB Connection & interaction

## Build Setup
```
Run application locally:

# install dependencies
npm install

# build application
npm run build

# start the application
npm run start

# start the application in DEV
npm run dev
```

```
Run application via Docker & Docker Compose:
# Make sure you have Docker & Docker Compose installed in your machine

# run via docker-compose
docker-compose up -d
```

## Environment Variables
Refere to [env.example](https://github.com/mrdcny/graphql-api/blob/main/.env.example) file included in the source code
```
NODE_ENV="<DEPLOYMENT ENVIRONMENT> | development | test | production"
PORT="<SERVER PORT>"
CORS_ORIGIN="*"
DB_URL="<MONGO_DB_URL>"
JWT_SECRET_KEY="<JWT_SECRET_KEY | UUID>"

INFURA_ENDPOINT="<INFURA RPC URL>"
```
## Try it out
Try the live API by accessing this [graphQL playground](http://ec2-13-250-97-164.ap-southeast-1.compute.amazonaws.com:3000/playground) or http://localhost:3000/playground for local setup

