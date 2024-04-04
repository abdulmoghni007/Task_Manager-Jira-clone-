import { Component } from '@angular/core';
import {UserService} from "../Services/user.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../Services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import swal from "sweetalert";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";


@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,NgIf,AngularEditorModule,NavigationBarComponent],
  templateUrl: './create-new-task.component.html',
  styleUrl: './create-new-task.component.css'
})
export class CreateNewTaskComponent {
  isFormSubmitted = false;
  role:any;
  isValidator:boolean=false;

  issues:any=[];
  users:any=[];
  priorities:any=[];
  taskStatuses:any=[];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',


  };

  form = new FormGroup({
    taskName:new FormControl(''),

    title:new FormControl('',),
    description:new FormControl(''),
    issueId:new FormControl(''),
    priorityId:new FormControl(''),
    // dueDate:new FormControl(''),
    dueDate:new FormControl('', [
      Validators.required,
      this.minDateValidator(),
    ]),

    assignId:new FormControl(''),
    taskStatusId:new FormControl(''),

  })

constructor(private userService:UserService,public router: Router, private authService: AuthService) {
  localStorage.removeItem('postId');
    this.authService.getUser().subscribe((data) => {

      if (data.role=="Admin") {
        router.navigate(["/createNewTask"]);
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




createNewTask(){

  this.isFormSubmitted = true;
  if (this.form.valid) {
    this.userService.createNewTask(this.form.value).subscribe((post) => {

      if (post.status) {
        swal({
          title: "Success",
          text: "You have created new post",
          icon: "success",
          timer: 2000,
        }).then(() => {
          // Reload the window after showing the success message
          window.location.reload();
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
  else{
    alert("Form not valid \n Check for the date");
  }

}
  isFieldInvalid(field: string) {
    return this.form.get(field)?.invalid && (this.form.get(field)?.touched || this.form.get(field)?.dirty || this.isFormSubmitted)
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError("required")) return `${label} is required`;
    if (this.form.get(field)?.hasError("minlength")) return `${label} should be at least ${this.form.get(field)?.getError("minlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("maxlength")) return `${label} should be at most ${this.form.get(field)?.getError("maxlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }





  minDateValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const today = new Date();
      if (control.value) {
        const selectedDate = new Date(control.value); // Parse directly from value
        return selectedDate < today ? { minDate: true } : null;
      }
      return null;
    };
  }










}
