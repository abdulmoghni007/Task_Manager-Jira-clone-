<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NavigationMenu extends Model
{

    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'navigation_menu',
        'navigation_link',
        'role'
    ];
}
