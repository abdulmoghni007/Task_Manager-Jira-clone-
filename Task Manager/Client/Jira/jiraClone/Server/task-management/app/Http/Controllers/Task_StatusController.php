<?php

namespace App\Http\Controllers;
use App\Models\TaskStatus;
use App\Models\User;

use Illuminate\Http\Request;

class Task_StatusController extends Controller
{
    public function getTaskStatus(Request $request){
        $user = $request->user();
        $role = $user->role()->first()->role;
        if($role=="Admin"){
            $taskStatus = TaskStatus::all();

            return response()->json([
                'taskStatus' => $taskStatus,
                'status' => true
            ]);
        }
        else{
            $user = 2;
            $taskStatus = TaskStatus::where('role_id', $user)->get();

            return response()->json([
                'taskStatus' => $taskStatus,
                'status' => true
            ]);

        }
    }
}
