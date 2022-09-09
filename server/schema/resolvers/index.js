const { User, Task } = require('../../models');
const auth = require('./auth');

module.exports = {
  Query: {
    task: () => ({}),
    user: () => ({}),
    ...auth.query,
  },
  UserQuery: User.query,
  TaskQuery: Task.query,
  
  Mutation: {
    task: () => ({}),
    user: () => ({}),
    ...auth.mutation,
  },
  UserMutate: User.mutation,
  TaskMutate: Task.mutation,
};