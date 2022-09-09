# cll-task-list-web-app

## How to install


<h1>Client</h1>

1. From root dir, go to client folder: `cd client/`
2. Create .env file: `cp .env.example .env` and configure
3. `yarn install`
4. `yarn dev`

<h1>Server</h1>

1. From root dir, go to server folder: `cd server/`
2. Create .env file: `cp .env.example .env` and configure
3. `yarn install`
4. Run your MySQL server, then: `yarn migrate:seed`
5. `yarn server`
6. Task list web app, go to `localhost:3000`, login: email `ramirezjason392@gmail.com`, password: `password`
7. Apollo GraphQL, go to `localhost:4000`
