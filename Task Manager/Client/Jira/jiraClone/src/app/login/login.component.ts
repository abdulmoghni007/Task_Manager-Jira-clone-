import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import swal from "sweetalert";
import {UserService} from "../Services/user.service";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isFormSubmitted = false;
  role: any;
  isValidator: boolean = false;

  form = new FormGroup({
    email: new FormControl('', Validators.pattern("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$")),
    password: new FormControl('')
  });




constructor(private userService:UserService,public router: Router, private authService: AuthService) {
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

}





















  logIn() {

    this.isFormSubmitted = true;


    if (this.form.valid) {
      this.userService.logIn(this.form.value).subscribe((posts) => {

        if (posts.status) {
          swal({
            title: "Success",
            text: "Log in successful",
            icon: "success",
            timer: 2000,
          });
console.log(posts.data.token);
          localStorage.setItem('token', posts.data.token);
          localStorage.setItem('name',posts.data.user.name);
          if(posts.role=="Admin"){
          this.router.navigate(['/createNewTask']);}
          else{
            this.router.navigate(['/taskList']);
          }



        }

      }, error => {
        swal({
          title: "Login failed",
          text: "Please enter valid credential ",
          icon: "error",
          timer: 1500,
        });
      });
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










}
