<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_attributes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('category_id');
            $table->uuid('spec_attribute_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('spec_attribute_id')->references('id')->on('product_spec_attributes')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_attributes');
    }
};

