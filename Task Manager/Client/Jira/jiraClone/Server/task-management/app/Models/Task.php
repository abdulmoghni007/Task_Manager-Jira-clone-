<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Task extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assign_id');
    }

    public function issue()
    {
        return $this->belongsTo(Issue::class);
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }

    public function taskStatus()
    {
        return $this->belongsTo(TaskStatus::class, 'task_status_id');
    }

    protected $fillable = [
        'task_id',
        'name',
        'title',
        'description',
        'issue_id',
        'priority_id',
        'due_date',
        'assign_id',
        'task_status_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($task) {
            $latestTask = static::latest()->first();
            if ($latestTask) {
                $task_id = explode('-', $latestTask->task_id);
                $task->task_id = 'TASK-' . str_pad($task_id[1] + 1, 3, '0', STR_PAD_LEFT);
            } else {
                $task->task_id = 'TASK-001';
            }
        });
    }
}
