const { gql } = require('apollo-server');

module.exports = gql`
  scalar DateTime

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    roles: String!
    permissions: String!
    updated_at: DateTime
    created_at: DateTime!
  }

  type Task {
    id: ID!
    user_id: ID!
    note: String!
    updated_at: DateTime
    created_at: DateTime!
  }

  type UserQuery {
    all: [User]
    getTasks: [Task]
  }
  
  type TaskQuery {
    all: [Task]
  }

  type Query {
    task: TaskQuery
    user: UserQuery
    auth: User
  }

  type UserMutate {
    create(first_name: String!, last_name: String!, email: String!, password: String!): User
    update(id: ID!, first_name: String, last_name: String, email: String, password: String): User
    delete(id: ID!): User
  }

  type TaskMutate {
    create(user_id: ID!, note: String!): Task
    update(id: ID!, note: String!): Task
    delete(id: ID!): Task
  }

  type Mutation {
    task: TaskMutate
    user: UserMutate
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: String!
    user: User!
  }
`;