# nutrition program - minimal MERN framework to serve as a template

boilerplate using react, node, express and mongo

# How to Run / deploy

## locally

clone
run npm init in the root directory and in the client directory

Set environment variables:
MONGO_USER
MONGO_PW
MONGO_URL
MONGO_DBNAME

OR just set MONGO_URI

NODE_ENV

REACT*APP* variables to connect to server

start server: node server.js or nodemon server.js
start client: cd/client && npm start

## deployment on heroku

- the repo contains heroku configuration (Procfile in root and heroku-postbuild script in package.json in root)
- environment variables will need to be set via heroku cli or website

- important: set env variable https://stackoverflow.com/questions/73374091/heroku-rails-react-eresolve-could-not-resolve
  NPM_CONFIG_LEGACY_PEER_DEPS = true to avoid crashing builds due to legacy package issues

# Features:

## Done:

### Client

- ability to get data from server and display it

### Server

- cors middleware allowing access from designated origins

## TODO:

## Client:

- basic routing
- basic layout (no bootstrap)
- authentication
- basic reusable components
- ability to connect to back end

## Server:

- rest api routes serving data from mongodb and allowing for CRUD operations
- basic logging
- authentication / authorization
- error checking
- testing

# dependencies:

See /docs/packages.md
