<?php

namespace App\Controllers\Api;

use App\Models\ProductModel; // use only for IDE
use CodeIgniter\RESTful\ResourceController;

class ProductController extends ResourceController
{
    protected $modelName = 'App\Models\ProductModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->getProductsWithCategory());   
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if ($this->model->insert($data)) {
            $data['id'] = $this->model->getInsertID();
            return $this->respondCreated($data, 'Producto creado');
        }

        return $this->failValidationErrors($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (!$this->model->find($id)) {
            return $this->failNotFound('Producto no encontrado');
        }

        $rules = $this->model->getValidationRules();
        if (isset($rules['sku'])) {
            $rules['sku'] = str_replace('{id}', $id, $rules['sku']);
            $this->model->setValidationRules($rules);
        }

        if ($this->model->update($id, $data)) {
            $data['id'] = $id;
            return $this->respond($data, 200, 'Producto actualizado');
        }

        return $this->failValidationErrors($this->model->errors());
    }

    public function delete($id = null)
    {
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('No se encontró el producto con ID: ' . $id);
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id], 'Producto eliminado correctamente');
        }

        return $this->fail('No se pudo eliminar el recurso', 500);
    }
}