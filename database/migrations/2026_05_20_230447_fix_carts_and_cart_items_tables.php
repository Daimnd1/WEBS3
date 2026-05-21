<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');

        Schema::create('carts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->unique()->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('cart_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('cart_id')->constrained('carts')->onDelete('cascade');
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
            $table->unique(['cart_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');
    }
};
