<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table            = 'products';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $protectFields    = true;
    
    // Fields
    protected $allowedFields    = ['category_id', 'sku', 'name', 'stock', 'price'];

    // Dates created_at/updated_at
    protected $useTimestamps    = true; 
    protected $dateFormat       = 'datetime';
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';

    // Basic Validation
    protected $validationRules      = [
        'category_id' => 'required|is_natural_no_zero',
        'sku'         => 'required|alpha_dash|is_unique[products.sku,id,{id}]',
        'name'        => 'required|min_length[3]',
        'stock'       => 'required|numeric',
        'price'       => 'required|numeric',
    ];

    // List products with category
    public function getProductsWithCategory()
    {
        return $this->select('products.*, categories.name as category_name')
                    ->join('categories', 'categories.id = products.category_id')
                    ->findAll();
    }
}
