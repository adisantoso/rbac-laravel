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
        Schema::create('menu_moduls', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('module_id');
            $table->string('menu');
            $table->string('url')->unique();
            $table->string('menu_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_moduls');
    }
};
