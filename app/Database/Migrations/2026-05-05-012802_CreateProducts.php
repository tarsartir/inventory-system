<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateProducts extends Migration
{
  public function up()
  {
    $this->forge->addField([
      'id'          => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
      'category_id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
      'sku'         => ['type' => 'VARCHAR', 'constraint' => 50, 'unique' => true],
      'name'        => ['type' => 'VARCHAR', 'constraint' => 255],
      'stock'       => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
      'price'       => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0.00],
      'created_at'  => ['type' => 'DATETIME', 'null' => true],
      'updated_at'  => ['type' => 'DATETIME', 'null' => true],
    ]);
    $this->forge->addKey('id', true);
    $this->forge->addForeignKey('category_id', 'categories', 'id', 'CASCADE', 'CASCADE');
    $this->forge->createTable('products');
  }

  public function down()
  {
    //
  }
}
