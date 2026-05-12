<?php

/**
 * @var \CodeIgniter\Router\RouteCollection $routes
 */

$routes->options('(:any)', function () {
  $response = response();
  $response->setStatusCode(204);
  $response->setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  $response->setHeader('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');
  $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  return $response->send();
});

// --- API RUTES ---
$routes->group('api', ['namespace' => 'App\Controllers\Api'], function ($routes) {
  //** Test */
  $routes->get('test', 'TestController::index');

  //** Products */
  $routes->resource('products', ['controller' => 'ProductController']);

  //** Categories */
  $routes->resource('categories', ['controller' => 'CategoryController']);

});

// --- ANY RUTES ---
$routes->get('(:any)', function () {
  $path = FCPATH . 'index.html';
  if (file_exists($path)) {
    return file_get_contents($path);
  }
  return "Error: No encuentro el archivo en: " . realpath($path);
});
