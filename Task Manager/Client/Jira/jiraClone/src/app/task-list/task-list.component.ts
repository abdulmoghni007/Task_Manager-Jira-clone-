import { Component } from '@angular/core';
import {UserService} from "../Services/user.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../Services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,NgIf,NavigationBarComponent,NgFor,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskStatuses:any=[];
  tasks:any=[];
  totalPages:number=0;
  pages:any=[];
  currentPage:number=1;
  selectedPriority:string="";
  searchQuery:string="";
  selectedIssue:string="";
  selectedStatus:string="";
constructor(private userService:UserService,public router: Router, private authService: AuthService){
  localStorage.removeItem('postId');
  this.authService.getUser().subscribe((data) => {

      if (data.status) {
        router.navigate(["/taskList"]);
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


  this.userService.getTaskStatus().subscribe((taskStatus)=>{
    this.taskStatuses=taskStatus.taskStatus;

  });


  this.getTask(this.currentPage);

}
getTask(pageNumber:number){
  this.userService.getTask(pageNumber).subscribe((tasks)=>{
    this.tasks=tasks.tasks.data;
    this.pages=tasks.pages;


  });

}


setPostId(postId:string){
  localStorage.setItem('postId',postId);
  this.router.navigate(["/taskDetail"]);
}


  changePage(pageNumber: number): void {
  this.currentPage=pageNumber;
    this.getTask(pageNumber);
  }

  getAllTasks(pageNumber: number): void {

    console.log('Fetching tasks for page:', pageNumber);
  }

  getPageNumbers(totalPages:number): number[] {
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }
}
