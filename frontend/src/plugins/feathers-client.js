import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
const auth = require('@feathersjs/authentication-client');

const feathersClient = feathers();

// Connect to the same as the browser URL (only in the browser)
//const restClient = rest();

console.log('Feathers client: connect to', process.env.ApiUrl);

// Connect to a different URL
const restClient = rest(process.env.ApiUrl);

// Configure an AJAX library (see below) with that client
feathersClient.configure(restClient.fetch(window.fetch));

feathersClient.configure(
  auth({
    storageKey: 'auth',
  })
);

const tasks = feathersClient.service('tasks');

export { feathersClient, tasks };
