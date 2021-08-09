'use strict';

const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas');
const getOrders = require('./handlers/get-orders');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const updateDeliveryStatus = require('./handlers/update-delivery-status');

// Define routes
api.get('/', () => 'Welcome to Pizza API');

api.get('/pizzas', () => {
  return getPizzas();
});
api.get(
  '/pizzas/{id}',
  (request) => {
    return getPizzas(request.pathParams.id);
  },
  {
    error: 404,
  }
);

api.get(
  '/orders',
  (request) => {
    return getOrders();
  },
  {
    error: 400,
  }
);
api.get(
  '/orders/{id}',
  (request) => {
    return getOrders(request.pathParams.id);
  },
  {
    error: 400,
  }
);
api.post(
  '/orders',
  (request) => {
    return createOrder(request.body);
  },
  {
    success: 201,
    error: 400,
  }
);
api.put(
  '/orders/{id}',
  (request) => {
    return updateOrder(request.pathParams.id, request.body);
  },
  {
    error: 400,
  }
);
api.delete(
  '/orders/{id}',
  (request) => {
    return deleteOrder(request.pathParams.id);
  },
  {
    error: 400,
  }
);
api.post(
  'delivery',
  (request) => {
    return updateDeliveryStatus(request.body);
  },
  {
    success: 200,
    error: 400,
  }
);

module.exports = api;
