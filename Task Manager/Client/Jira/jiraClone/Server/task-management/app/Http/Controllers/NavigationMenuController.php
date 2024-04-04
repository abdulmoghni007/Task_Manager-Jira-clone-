<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\NavigationMenu;
use Illuminate\Http\Request;

class NavigationMenuController extends Controller
{
    public function getMenuItems(Request $request){
        $user = $request->user();
        $role = $user->role()->first()->role;
        if($role=="Admin"){
            $menuItems = NavigationMenu::all();

            return response()->json([
                'menus' => $menuItems,
                'status' => true
            ]);}
        else{
           $menuItems=NavigationMenu:: where('role', 'user')->get();
            return response()->json([
                'menus' => $menuItems,
                'status' => true
            ]);
        }

    }
}
