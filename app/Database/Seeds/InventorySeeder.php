<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class InventorySeeder extends Seeder
{
    public function run()
    {
        $this->db->table('categories')->insertBatch([
            ['name' => 'Electrónica', 'description' => 'Gadgets y componentes'],
            ['name' => 'Oficina', 'description' => 'Suministros de escritorio'],
        ]);
    }
}
