import { buildSchema } from "graphql";

const schema = buildSchema(`
    type User {
      email: String!
      password: String!
    }
    type UserResponse {
      email: String!
      accessToken: String!
    }

    type Axie {
      id: ID!
      name: String!
      stage: String!
      class: String!
      currentPriceUsd: Float!
    }
    
    type Query {
       getLatestAxies: [Axie]
       getAxieTotalSupply: String!
    }

    type Mutation {
       login(email: String!, password: String!): UserResponse!
       register(email: String!, password: String!): UserResponse!
       saveLatestAxies: String!
    }
`);

export default schema;
