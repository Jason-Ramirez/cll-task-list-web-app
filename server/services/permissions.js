const { and, or, rule, shield } = require("graphql-shield");
const appConfig = require('../config/app');

function getPermissions(user) {
  if (user && user[appConfig.url]) {
    return user[appConfig.url].permissions;
  }
  return [];
}

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

// const canReadAnyAccount = rule()((parent, args, { user }) => {
//   const userPermissions = getPermissions(user);
//   return userPermissions.includes("read:any_account");
// });

// const canReadOwnAccount = rule()((parent, args, { user }) => {
//   const userPermissions = getPermissions(user);
//   return userPermissions.includes("read:own_account");
// });

// const isReadingOwnAccount = rule()((parent, { id }, { user }) => {
//   return user && user.sub === id;
// });

const permissions = shield({
  Query: {
    // user: or(and(canReadOwnAccount, isReadingOwnAccount), canReadAnyAccount),
    // all: canReadAnyAccount,
    // auth: isAuthenticated,
  },
  UserQuery: {
    // all: isAuthenticated,
  },
  TaskMutate: {
    create: isAuthenticated,
    delete: isAuthenticated
  }
});

module.exports = { permissions };