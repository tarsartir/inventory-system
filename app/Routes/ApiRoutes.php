<?php

/**
 * @var \CodeIgniter\Router\RouteCollection $routes
 */

use CodeIgniter\Config\Services;

$routes = Services::routes();

// --- API RUTES ---
$routes->group('api', function($routes) {
    $routes->get('test', 'TestController::index');
});

// --- ANY RUTES ---
$routes->get('(:any)', function() {
    $path = FCPATH . 'index.html';
    if (file_exists($path)) {
        return file_get_contents($path);
    }
    return "Error: No encuentro el archivo en: " . realpath($path);
});