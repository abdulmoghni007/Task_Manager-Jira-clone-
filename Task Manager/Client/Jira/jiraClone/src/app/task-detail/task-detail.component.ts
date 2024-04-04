import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {UserService} from "../Services/user.service";
import {AuthService} from "../Services/auth.service";
import swal from "sweetalert";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkActive,RouterLink,NgIf,FormsModule,CommonModule,NavigationBarComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  taskDetail:any=[];
  taskStatuses:any=[];
  issues:any=[];
  users:any=[];
  priorities:any=[];
  statusId:number=0;

  assigneeId:number=0;
  prioityId=0;
  issueId=0;


  constructor(private userService:UserService,public router: Router, private authService: AuthService){
    this.authService.getUser().subscribe((data) => {

        if (data.status) {
          router.navigate(["/taskDetail"]);
        }
        else {
          localStorage.removeItem('token');
          router.navigate(["/"]);
        }
      },error=>{
        localStorage.removeItem('token');
        router.navigate(["/"]);
      }
    );



    this.userService.getTaskDetail().subscribe((taskData)=>{
      this.taskDetail=taskData.task;


    });

    this.userService.getIssue().subscribe((issue)=>{
      this.issues=issue.issues;
    });

    this.userService.getUsers().subscribe((users)=>{
      this.users=users.users;
    });

    this.userService.getPriorities().subscribe((priorities)=>{
      this.priorities=priorities.priority;

    });

    this.userService.getTaskStatus().subscribe((taskStatus)=>{
      this.taskStatuses=taskStatus.taskStatus;

    });

  }

updateTaskDetail(taskId:number){
  this.userService.updateTask( taskId,this.statusId,this.assigneeId,this.prioityId,this.issueId).subscribe((taskStatus)=>{
    if (taskStatus.status) {
      swal({
        title: "Success",
        text: "You have updated the post",
        icon: "success",
        timer: 2000,
      }).then(() => {
        // Reload the window after showing the success message
        window.location.reload();
      });}
    else{
      swal({
        title: "Failed",
        text: "You failed to update the post",
        icon: "success",
        timer: 2000,
      });
    }

  }, error => {
    swal({
      title: " Failed",
      text: "Please check the fields",
      icon: "error",
      timer: 1500,
    });
  });


}


}
