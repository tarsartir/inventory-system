<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class TestController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        return $this->respond([
            'status'  => 'success',
            'message' => '¡Conexión establecida!',
            'data'    => [
                'php_version' => PHP_VERSION,                
                'ci_version'  => \CodeIgniter\CodeIgniter::CI_VERSION, 
                'engine'      => 'Axios + CI4 Filter'       
            ],
        ]);
    }
}