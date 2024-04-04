<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function userRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
            'username' => ['required', 'unique:users,name'],

        ]);
        if ($validator->fails()) {
            return response($validator->errors(), 400);
        } else {
            $userData = [

                'email' => $request->email,
                'password' => Hash::make($request->password),
                'name' => $request->username,
                
            ];

            DB:: beginTransaction();
            try {
                $user = User::create($userData);
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json([$e]);
                $user = null;
            }
            if ($user != null) {
                return response()->json([
                    'message' => "User registered successfully",
                    'status' => true,
                ], 200);
            } else {
                return response()->json([
                    'message' => "Internal Server error"
                ], 500);
            }

        }
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'email' => ['required', 'email'],
            'password' => ['required'],


        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()], 400);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Invalid credentials'
                ], 401);
            } else {
                $data['token'] = $user->createToken($request->email)->plainTextToken;
                $data['user'] = $user;

                $roleName=$user->role->role;

                $response = [
                    'status' => 'success',
                    'message' => 'User is logged in successfully.',
                    'data' => $data,
                ];

                return response()->json($response, 200);
            }
        }

    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json(["message" => "logout hits"], 200);
    }




    public function getUser(Request $request)
    {
        $user = $request->user();
        $username = $user->name;
        $role = $user->role()->first()->role; // or $user->role()->get()

        return response()->json([
            "username" => $username,
            "status" => true,
            "role" => $role
        ]);
    }


    public function getAllUser(Request $request){
        $user = $request->user();
        $role = $user->role()->first()->role;
        if($role=='Admin'){
        $users = User::where('role_id', 2)->get();
        return response()->json([
            "users" => $users,
            "status" => true,

        ]);}
        else{
            return response()->json(["message"=>"You are not authorize"],401);
        }
    }





}
