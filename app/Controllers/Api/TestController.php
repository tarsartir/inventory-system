<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class TestController extends ResourceController
{
    public function index()
    {
        return $this->respond([
            'status'  => '200',
            'message' => '¡Conexión establecida!',
            'data'    => [
                'php_version' => PHP_VERSION,                
                'ci_version'  => \CodeIgniter\CodeIgniter::CI_VERSION, 
                'engine'      => 'Axios + CI4 Filter'       
            ],
        ]);
    }
}