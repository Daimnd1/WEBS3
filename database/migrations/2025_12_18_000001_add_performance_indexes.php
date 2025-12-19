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
        Schema::table('products', function (Blueprint $table) {
            // Index for category filtering and pagination
            if (!Schema::hasColumn('products', 'category_id') || 
                !collect(Schema::getIndexes('products'))->pluck('name')->contains('products_category_id_index')) {
                $table->index('category_id', 'products_category_id_index');
            }
            
            // Composite index for category + created_at (for pagination with filtering)
            $indexName = 'products_category_created_index';
            if (!collect(Schema::getIndexes('products'))->pluck('name')->contains($indexName)) {
                $table->index(['category_id', 'created_at'], $indexName);
            }
        });

        Schema::table('categories', function (Blueprint $table) {
            // Index for name lookups
            $indexName = 'categories_name_index';
            if (!collect(Schema::getIndexes('categories'))->pluck('name')->contains($indexName)) {
                $table->index('name', $indexName);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_category_id_index');
            $table->dropIndex('products_category_created_index');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex('categories_name_index');
        });
    }
};
