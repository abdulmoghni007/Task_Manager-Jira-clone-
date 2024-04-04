<?php

namespace App\Http\Controllers;

use App\Models\Priority;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

class PriorityController extends Controller
{
    public function getPriority(Request $request){
        $user = $request->user();
        $role = $user->role()->first()->role;
        if($role=="Admin"){
        $priority = Priority::all();

        return response()->json([
            'priority' => $priority,
            'status' => true
        ]);}
        else{
            return response()->json(["message"=>"You are not authorize"],401);
        }
    }
}
