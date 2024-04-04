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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_id')->unique();
            $table->string('name');
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('issue_id');
            $table->unsignedBigInteger('priority_id');
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('assign_id');
            $table->unsignedBigInteger('task_status_id');


            $table->foreign('issue_id')->references('id')->on('issues');
            $table->foreign('priority_id')->references('id')->on('priorities');
            $table->foreign('assign_id')->references('id')->on('users');
            $table->foreign('task_status_id')->references('id')->on('task_statuses');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
