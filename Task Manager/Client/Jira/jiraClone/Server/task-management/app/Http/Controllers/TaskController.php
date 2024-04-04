<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function createTask(Request $request)
    {

        $user = $request->user();
        $role = $user->role()->first()->role;

        if ($role == "Admin") {

            $validator = Validator::make($request->all(), [

                'taskName' => ['required'],
                'title' => ['required'],
                'description' => ['required'],
                'issueId' => ['required'],
                'priorityId' => ['required'],
                'dueDate' => ['required'],
                'assignId' => ['required'],
                'taskStatusId' => ['required'],

            ]);
            if ($validator->fails()) {
                return response($validator->errors(), 400);
            } else {
                $taskData = [


                    'name' => $request->taskName,
                    'title' => $request->title,
                    'description' => $request->description,
                    'issue_id' => $request->issueId,
                    'priority_id' => $request->priorityId,
                    'due_date' => $request->dueDate,
                    'assign_id' => $request->assignId,
                    'task_status_id' => $request->taskStatusId,


                ];

                DB:: beginTransaction();
                try {
                    $user = Task::create($taskData);
                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json([$e]);
                    $user = null;
                }
                if ($user != null) {
                    return response()->json([
                        'message' => "Task created successfully",
                        'status' => true,
                    ], 200);
                } else {
                    return response()->json([
                        'message' => "Internal Server error"
                    ], 500);
                }

            }


        } else {
            return response()->json(["message" => "You donot have rights"], 401);
        }


    }

    public function getTask(Request $request)
    {
        $user = $request->user();
        $role = $user->role()->first()->role;

        if ($role == "Admin") {
            $tasks = Task::with(['issue', 'priority', 'assignee', 'taskStatus'])->paginate(5);
            $pages=[
                "currentPage"=>$tasks->currentPage(),
                "totalPages"=>$tasks->lastPage()
            ];
            return response()->json([
                'tasks' => $tasks,
                'pages'=>$pages,
                'status' => true
            ]);
        } else {
            $userId = $request->user()->id;
            $tasks = Task::where('assign_id', $userId)
                ->with(['issue', 'priority', 'assignee', 'taskStatus'])
                ->paginate(5);
    $pages=[
        "currentPage"=>$tasks->currentPage(),
        "nextPage"=>$tasks->lastPage()
    ];
            return response()->json([
                'tasks' => $tasks,
                'pages'=>$pages,
                'status' => true
            ]);


        }


    }






    public function updateTask(Request $request)
    {
        $taskId = $request->taskId;
        $newTaskStatusId = $request->statusId;
        $newIssueId = $request->issueId;
        $newPriorityId = $request->priorityId; // corrected variable name
        $newAssigneeId = $request->assigneeId;
        $user = $request->user();
        $role = $user->role()->first()->role;

        $task = Task::find($taskId);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
                'status' => false
            ], 404);
        }

        if ($role == "Admin") {
            if ($newTaskStatusId!="0") {
                $task->task_status_id = $newTaskStatusId;
            }

            if ($newAssigneeId !="0") {
                $task->assign_id = $newAssigneeId;
            }

            if ($newIssueId!="0") {
                $task->issue_id = $newIssueId;
            }

            if ($newPriorityId!="0") {
                $task->priority_id = $newPriorityId; // corrected variable name
            }
        } else {
            if ($newTaskStatusId!="0") {
                $task->task_status_id = $newTaskStatusId;
            }
        }

        $task->save();

        return response()->json([
            'message' => 'Task status updated successfully',
            'status' => true
        ]);
    }

    public function getTaskDetail(Request $request)
    { $user = $request->user();
        $userId=$user->id;
        $role = $user->role()->first()->role;

        if($role=="Admin"){
        try {
            // Get the task ID from the request
            $taskId = $request->postId;

            // Find the task by its ID
            $task = Task::where('task_id', $taskId)->with(['issue', 'priority', 'assignee', 'taskStatus'])
                ->get();

            // Check if the task exists
            if (!$task) {
                return response()->json(["message" => "Task not found", "status" => false], 404);
            }

            // Return the task details
            return response()->json(["task" => $task, "status" => true], 200);

        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(["message" => "An error occurred", "status" => false], 500);
        }
    }
    else{
        try {
            // Get the task ID from the request
            $taskId = $request->postId;

            // Find the task by its ID
            $task = Task::where('task_id', $taskId)->where('assign_id', $userId)->with(['issue', 'priority', 'assignee', 'taskStatus'])
                ->get();

            // Check if the task exists
            if (!$task) {
                return response()->json(["message" => "Task not found", "status" => false], 404);
            }

            // Return the task details
            return response()->json(["task" => $task, "status" => true], 200);

        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(["message" => "An error occurred", "status" => false], 500);
        }
    }
    }






}
