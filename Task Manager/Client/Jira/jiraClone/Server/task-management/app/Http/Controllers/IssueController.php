<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function getIssue(Request $request){

        $user = $request->user();
        $role = $user->role()->first()->role;
        if($role=="Admin"){
        $issues = Issue::all();

        return response()->json([
            'issues' => $issues,
            'status' => true
        ]);}
        else{
            return response()->json(["message"=>"You are not authorize"],401);
        }
    }
}
