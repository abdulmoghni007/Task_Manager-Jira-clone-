<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class TaskStatus extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    protected $fillable = [
        'task_status',
        'role_id'
    ];
}
