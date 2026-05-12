<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ProductSeeder extends Seeder
{
  public function run()
  {
    $this->db->table('products')->insert([
      'category_id' => 1,
      'sku'         => 'LAP-001',
      'name'        => 'Laptop Gamer Pro',
      'stock'       => 10,
      'price'       => 1200.50,
      'created_at'  => date('Y-m-d H:i:s'),
    ]);
  }
}
