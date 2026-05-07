<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

require APPPATH . 'Routes/AppRoutes.php';
require APPPATH . 'Routes/ApiRoutes.php';

