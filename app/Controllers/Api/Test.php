<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;

class Productos extends BaseController
{
    public function index()
    {
        return $this->response->setJSON([
            'status' => 'success', 
            'message' => 'Hola desde CI4', 
            'stack'   => 'CodeIgniter 4', 'React', 'Tailwind 4', 'DaisyUI'
        ]);
    }
}